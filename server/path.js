// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoClient = require('mongodb').MongoClient;
var mongoUrl = "mongodb://localhost:27017/";
var dbName = 'mentalhealthdb';
let date = require('date-and-time');


// Collections
var usersColl = "Users";
var topicsColl = "Topics";
var chatsColl = "Chats";
var msgColl = "Message";

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.set('port', process.env.PORT || 3000);


app.post('/signup', function(postReq, postRes){
	var obj = postReq.body;
	var username = obj.username;

	mongoClient.connect(mongoUrl, { ...obj, useNewUrlParser: true }, function(connerErr, db) {
		if (connerErr) throw connerErr;
		var dbo = db.db(dbName);

		// Verify if user already exists
		dbo.collection(usersColl).find({username : username}).toArray(function(findErr, findRes) {
			if (findErr) throw findErr;
			if (findRes.length != 0) {
				console.log("username already exists: ", username)
				db.close();
				postRes.json({statusMessage : -1});
				return;
			}

			// Insert user into db
			dbo.collection(usersColl).insertOne(obj, function(insertErr, insertRes) {
				if (insertErr) throw insertErr;
				console.log("user created: ", username);
				db.close();
				postRes.json({statusMessage : 1});
			});
		});
	});
});


app.post('/login', function(postReq, postRes) {
	var obj = postReq.body;
	console.log(obj);
	mongoClient.connect(mongoUrl, { useNewUrlParser: true }, function(connerErr, db) {
		if (connerErr) throw connerErr;
		var dbo = db.db(dbName);

		// Verify if entry exists in users collection
		dbo.collection(usersColl).find({"pass": obj["pass"]}).toArray(function(findErr, findRes) {
			if (findErr) throw findErr;
			if (findRes.length != 0) {
				console.log("success");
				db.close();
				postRes.json({statusMessage : 1});
				return;
			}
			console.log("failure");
			postRes.json({statusMessage : -1});
		});
	});
});


app.get('/gettopics', function(postReq, postRes) {
	console.log("Retrieving topics");
	var obj = postReq.body;

	mongoClient.connect(mongoUrl, { useNewUrlParser: true }, function(connerErr, db) {
		if (connerErr) throw connerErr;
		var dbo = db.db(dbName);

		dbo.collection(topicsColl).find().toArray(function(findErr, findRes) {
			if (findErr) throw findErr;
			db.close();
			postRes.json(findRes);
		});
	});
});


app.get('/getchatpreviews', function(postReq, postRes) {
	var obj = postReq.query;

	mongoClient.connect(mongoUrl, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("mentalhealthdb");
		dbo.collection(chatsColl).aggregate(
			[
			{ $lookup:
				  {
					from: 'Users',
					localField: 'user_id',
					foreignField: '_id',
					as: 'userdetail'
				  }
			},
			{ $unwind:
				{
					path: "$userdetail",
					preserveNullAndEmptyArrays: false
				}
			},
			{ $match:
				{
					topic_id : obj.topicId
				}
			}
			]
		).toArray(function(chatErr, chatRes) {
			if (chatErr) throw chatErr;
			console.log(chatRes);
			if (chatRes.length === 0) {
				postRes.json([]);
				return;
			}

			var chatPreviewsObj = [];
			for (var i = 0; i < chatRes.length; i++) {
				var chatPreviewObj = {};
				console.log(chatRes[i]);
				chatPreviewObj.avatarId = chatRes[i].userdetail.avatarID;
				chatPreviewObj.chatId = chatRes[i].topic_id
				chatPreviewObj.chatTitle = chatRes[i].chatTitle
				chatPreviewObj.chatDescription = chatRes[i].desc
				chatPreviewObj.authorName = chatRes[i].userdetail.displayname
				chatPreviewObj.numberOfViews = chatRes[i].numberofviews
				chatPreviewObj.numberOfReplies = chatRes[i].numberofreplies
				chatPreviewObj.postedDate = chatRes[i].PostedDate
				chatPreviewObj._id = chatRes[i]._id;
				chatPreviewsObj.push(chatPreviewObj)
				console.log(chatPreviewObj);
			}
			postRes.json(chatPreviewsObj);
			db.close();
		});
	});
});


app.get('/getchat', function(postReq, postRes){
	var obj = postReq.query;

	mongoClient.connect(mongoUrl, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db(dbName);
		dbo.collection(msgColl).aggregate(
			[
			{ $lookup:
				  {
					from: 'Users',
					localField: 'user_id',
					foreignField: '_id',
					as: 'userdetail'
				  }
			},
			{ $unwind:
				{
					path: "$userdetail",
					preserveNullAndEmptyArrays: false
				}
			},
			// { $lookup:
			// 	{
			// 	  from: 'Chats',
			// 	  localField: 'chat_id',
			// 	  foreignField: '_id',
			// 	  as: 'chatdetail'
			// 	}
			// },
			// { $unwind:
			// 	{
			// 		path: "$chatdetail",
			// 		preserveNullAndEmptyArrays: false
			// 	}
			// },
			{ $match:
				{
					chat_id : obj.chatId
				}
			}
		]
		).toArray(function(chatErr, chatRes) {
			console.log(chatRes);
			if (chatErr) throw chatErr;
			console.log("chat res length:", chatRes.length);
			if (chatRes.length <= 0) {
				postRes.json([]);
				return;
			}
			else {
				dbo.collection(chatsColl).updateOne(
				{"chatID" : obj.chatId },
				{ $inc: 
				  { numberofviews : 1 
				  } 
				  }, true)
			}

			var chatObj = {};
			// Get chat data
			// chatObj.chatTitle = chatRes[0].chatdetail.chatTitle;
			chatObj.numberOfReplies = chatRes.length;
			// chatObj.numberOfViews = chatRes[0].chatdetail.numberofviews;
			chatObj.messages = [];

			// Create messages
			for (var i = 0; i < chatRes.length; i++) {
				var msgObj = {};
				msgObj.avatarId = chatRes[i].userdetail.avatarID;
				msgObj.authorName = chatRes[i].userdetail.displayname;
				msgObj.date = chatRes[i].date;
				msgObj.messageBody = chatRes[i].messageBody;

				chatObj.messages.push(msgObj);
			}

			postRes.json(chatObj);
			db.close();
		});
	});
});


app.post('/sendmessage', function(postReq, postRes){
	var obj = postReq.body;

	mongoClient.connect(mongoUrl, { useNewUrlParser: true }, function(connerErr, db) {
		if (connerErr) throw connerErr;
		var dbo = db.db(dbName);

		var msgObj = {};
		msgObj.chat_id = obj.chatId;
		msgObj.messageBody = obj.messageBody;
		msgObj.user_id = obj.username;
		msgObj.date = date.format(new Date(), "MM/DD/YYYY");
		msgObj.userdetail = {};
		console.log(msgObj);
		// Insert message into db
		dbo.collection(msgColl).insertOne(msgObj, function(insertErr, insertRes) {
			console.log(insertErr);
			if (insertErr) throw insertErr;
			db.close();
			postRes.json({statusMessage : 1});
		});
	});
});


app.post('/createchat', function(postReq, postRes){
	var obj = postReq.body;
	console.log("Creating chat");

	mongoClient.connect(mongoUrl, { useNewUrlParser: true }, function(connerErr, db) {
		if (connerErr) throw connerErr;
		var dbo = db.db(dbName);

		console.log(obj);

		// Create new chat
		var chatObj = {};
		chatObj.chatTitle = obj.chatTitle;
		chatObj.user_id = obj.username;
		chatObj.topic_id = obj.topicId.toString();
		chatObj.PostedDate = (new Date()).toString();
		chatObj.numberofviews = 0;
		chatObj.numberofreplies = 0;
		chatObj.desc = obj.chatDescription;

		// Create new message
		var msgObj = {};
		msgObj.messageBody = obj.chatDescription;
		msgObj.username = obj.username;
		msgObj.date = date.format(new Date(), "MM/DD/YYYY");

		dbo.collection(chatsColl).countDocuments().then((count) => {
			
			// Insert chat to db
			dbo.collection(chatsColl).insertOne(chatObj, function(insertChatErr, insertChatRes) {
				if (insertChatErr) throw insertChatErr;
				// console.log("Chat inserted");
				// Insert message to db
				dbo.collection(msgColl).insertOne(msgObj, function(insertMsgErr, insertMsgRes) {
					db.close();
					postRes.json({
						statusMessage : 1,
						chatId: insertChatRes.ops[0]._id
					});
					// console.log("chat responding with messages");
				});
			});
		});
	});
});


app.listen(app.get('port'), function(){
    console.log('Listening...');
})