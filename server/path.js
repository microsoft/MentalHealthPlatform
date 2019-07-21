// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// Imports for Express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Imports for MongoDB
const mongoClient = require('mongodb').MongoClient;
const MONGO_URL = "mongodb://localhost:27017/";
const DATABASE_NAME = 'mentalhealthdb';

// Database collections
const USERS_COLLECTION = "Users";
const TOPICS_COLLECTION = "Topics";
const CHATS_COLLECTION = "Chats";
const MESSAGE_COLLECTION = "Message";

// TODO: Migrate logic for date string localization from server to client
const date = require('date-and-time');

const SUCCESS_STATUS_MESSAGE = 1;
const FAILED_STATUS_MESSAGE = -1;

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

const port = process.env.PORT || 3000;
app.set('port', port);

app.post('/signup', (postReq, postRes) => {
	console.log("Signing up...");

	const obj = postReq.body;
	const username = obj.username;

	mongoClient.connect(MONGO_URL, { ...obj, useNewUrlParser: true }, (connerErr, db) => {
		if (connerErr) throw connerErr;

		// Verify if user already exists
		const dbo = db.db(DATABASE_NAME);		
		dbo.collection(USERS_COLLECTION).find({ username }).toArray((findErr, findRes) => {
			if (findErr) throw findErr;

			if (findRes.length != 0) {
				console.log("Username already exists: " + username);
				db.close();
				postRes.json({ statusMessage: FAILED_STATUS_MESSAGE });
				return;
			}

			// Insert user into database
			dbo.collection(USERS_COLLECTION).insertOne(obj, (insertErr, insertRes) => {
				if (insertErr) throw insertErr;

				console.log("User created: ", username);
				db.close();
				postRes.json({ statusMessage: SUCCESS_STATUS_MESSAGE });
			});
		});
	});
});

app.post('/login', (postReq, postRes) => {
	console.log("Logging in...");

	const obj = postReq.body;
	mongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (connerErr, db) => {
		if (connerErr) throw connerErr;

		// Verify if entry exists in users collection
		const dbo = db.db(DATABASE_NAME);
		dbo.collection(USERS_COLLECTION).find({"pass": obj["pass"]}).toArray((findErr, findRes) => {
			if (findErr) throw findErr;

			if (findRes.length != 0) {
				console.log("Login successful");
				db.close();
				postRes.json({ statusMessage: SUCCESS_STATUS_MESSAGE });
				return;
			}

			console.log("Login failed");
			postRes.json({ statusMessage: FAILED_STATUS_MESSAGE });
		});
	});
});

app.get('/gettopics', (postReq, postRes) => {
	console.log("Retrieving topics...");

	mongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (connerErr, db) => {
		if (connerErr) throw connerErr;

		const dbo = db.db(DATABASE_NAME);
		dbo.collection(TOPICS_COLLECTION).find().toArray((findErr, findRes) => {
			if (findErr) throw findErr;

			db.close();
			postRes.json(findRes);
		});
	});
});

app.get('/getchatpreviews', (postReq, postRes) => {
	console.log("Getting chat previews");

	const obj = postReq.query;
	mongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (err, db) => {
		if (err) throw err;

		const dbo = db.db(DATABASE_NAME);
		dbo.collection(CHATS_COLLECTION).aggregate(
			[
				{
					$lookup: {
						from: 'Users',
						localField: 'user_id',
						foreignField: '_id',
						as: 'userdetail'
					}
				},
				{
					$unwind: {
						path: "$userdetail",
						preserveNullAndEmptyArrays: false
					}
				},
				{
					$match: {
						topic_id: obj.topicId
					}
				}
			]
		).toArray((chatErr, chatRes) => {
			if (chatErr) throw chatErr;

			if (chatRes.length === 0) {
				postRes.json([]);
				return;
			}

			const chatPreviewsObj = chatRes.map(chat => {
				return {
					_id: chat._id,
					avatarId: chat.userdetail.avatarID,
					chatId: chat.topic_id,
					chatTitle: chat.chatTitle,
					chatDescription: chat.desc,
					authorName: chat.userdetail.displayname,
					numberOfViews: chat.numberofviews,
					numberOfReplies: chat.numberofreplies,
					postedDate: chat.PostedDate
				};
			});

			postRes.json(chatPreviewsObj);
			db.close();
		});
	});
});

app.get('/getchat', (postReq, postRes) => {
	console.log("Getting chat...");

	const obj = postReq.query;
	mongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (err, db) => {
		if (err) throw err;

		const dbo = db.db(DATABASE_NAME);
		dbo.collection(MESSAGE_COLLECTION).aggregate(
			[
				{
					$lookup: {
						from: 'Users',
						localField: 'user_id',
						foreignField: '_id',
						as: 'userdetail'
					}
				},
				{
					$unwind: {
						path: "$userdetail",
						preserveNullAndEmptyArrays: false
					}
				},
				{
					$match: {
						chat_id: obj.chatId
					}
				}
			]
		).toArray((chatErr, chatRes) => {
			if (chatErr) throw chatErr;
			
			if (chatRes.length <= 0) {
				postRes.json([]);
				return;
			}

			
			dbo.collection(CHATS_COLLECTION).updateOne(
				{ "chatID": obj.chatId },
				{ $inc: { numberofviews: SUCCESS_STATUS_MESSAGE } },
				true
			);

			const messages = chatRes.map(chat => {
				return {
					avatarId: chat.userdetail.avatarID,
					authorName: chat.userdetail.displayname,
					date: chat.date,
					messageBody: chat.messageBody
				};
			});

			const chatObj = {
				numberOfReplies: chatRes.length,
				messages: messages
			};

			postRes.json(chatObj);
			db.close();
		});
	});
});

app.post('/sendmessage', (postReq, postRes) => {
	console.log("Sending message...");

	const obj = postReq.body;
	mongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (connerErr, db) => {
		if (connerErr) throw connerErr;		

		const msgObj = {
			chat_id: obj.chatId,
			messageBody: obj.messageBody,
			user_id: obj.username,
			date: date.format(new Date(), "MM/DD/YYYY"),
			userdetail: {}
		};

		// Insert message into database
		const dbo = db.db(DATABASE_NAME);
		dbo.collection(MESSAGE_COLLECTION).insertOne(msgObj, (insertErr, insertRes) => {			
			if (insertErr) throw insertErr;
			
			db.close();
			postRes.json({ statusMessage: SUCCESS_STATUS_MESSAGE });
		});
	});
});

app.post('/createchat', (postReq, postRes) => {
	console.log("Creating chat...");

	const obj = postReq.body;
	mongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (connerErr, db) => {
		if (connerErr) throw connerErr;

		// Create new chat object
		const chatObj = {
			chatTitle: obj.chatTitle,
			user_id: obj.username,
			topic_id: obj.topicId.toString(),
			PostedDate: (new Date()).toString(),
			numberofviews: 0,
			numberofreplies: 0,
			desc: obj.chatDescription
		};

		// Create new message object
		const msgObj = {
			messageBody: obj.chatDescription,
			username: obj.username,
			date: date.format(new Date(), "MM/DD/YYYY")
		};		

		// Insert newly created chat into database
		const dbo = db.db(DATABASE_NAME);
		dbo.collection(CHATS_COLLECTION).insertOne(chatObj, (insertChatErr, insertChatRes) => {
			if (insertChatErr) throw insertChatErr;
			
			// Insert message into database
			dbo.collection(MESSAGE_COLLECTION).insertOne(msgObj, (insertMsgErr, insertMsgRes) => {
				db.close();
				postRes.json({
					statusMessage: SUCCESS_STATUS_MESSAGE,
					chatId: insertChatRes.ops[0]._id
				});
			});
		});
	});
});

app.listen(app.get('port'), () => {
    console.log(`Server is running on Port ${port}...`);
});