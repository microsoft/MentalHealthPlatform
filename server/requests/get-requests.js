const ObjectId = require('mongodb').ObjectID;

const {
	TOPICS_COLLECTION, CHATS_COLLECTION, MESSAGE_COLLECTION, MONGO_URL, DATABASE_NAME, SUCCESS_STATUS_MESSAGE
} = require('../constants.js');

const getTopics = (mongoClient, postReq, postRes) => {
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
};

const getChatPreviews = (mongoClient, postReq, postRes) => {
	console.log("Getting chat previews...");

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

			const chatPreviewsObj = {};

			chatPreviewsObj.chatPreviews = chatRes.map(chat => {
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

			dbo.collection(TOPICS_COLLECTION).find({ _id: ObjectId(obj.topicId) }).toArray((topicErr, topicRes) => {
				if (topicErr) throw topicErr;
	
				const title = topicRes && topicRes[0] && topicRes[0].topicTitle;
				
				if (title === undefined) {
					console.log("Topic title cannot be found");
				}
				else {
					chatPreviewsObj.chatTitle = title;
				}

				postRes.json(chatPreviewsObj);
			});

			db.close();
		});
	});
};

const getTrendingPosts = (mongoClient, postReq, postRes) => {
	console.log("Getting trending posts...");

	mongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (err, db) => {
		if (err) throw err;

		const dbo = db.db(DATABASE_NAME);
		dbo.collection(CHATS_COLLECTION).find().sort({ numberofviews : -1 }).limit(3)
		.toArray((chatErr, chatRes) => {
			if (chatErr) throw chatErr;

			if (chatRes.length === 0) {
				postRes.json([]);
				return;
			}

			const trendingPostsObj = {};

			trendingPostsObj.chatPreviews = chatRes.map(chat => {
				return {
					title: chat.chatTitle,
					description: chat.desc,
					chat_id: chat._id,
					topic_id: chat.topic_id
				};
			});

			postRes.json(trendingPostsObj);

			db.close();
		});
	});
};

const getTrendingKeywords = (mongoClient, postReq, postRes) => {
	console.log("Getting trending keywords...");
	
	mongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (err, db) => {
		if (err) throw err;

		const dbo = db.db(DATABASE_NAME);
		dbo.collection(MESSAGE_COLLECTION).find().sort({ date : -1 }).limit(10)
		.toArray((messageErr, messageRes) => {
			if (messageErr) throw messageErr;

			if (messageRes.length === 0) {
				postRes.json([]);
				return;
			}

			const chatPreviewsObj = {};

			console.log(messageRes.map(current => current.messageBody))

			const messages = messageRes.reduce((accumulator, current) => {
				return accumulator += " " + current.messageBody;
			}, "");

			const words = messages.split(" ");

			const map = {};
			for (const word of words) {
				const currentWord = word.replace("?", "").replace("!", "").replace(".", "").replace(",", "");
				if (map[currentWord]) {
					map[currentWord]++;
				}
				else {
					map[currentWord] = 1;
				}
			}

			let countedWords = [];

			const keys = Object.keys(map);
			for (let i = 0; i < keys.length; i++) {
				const currentWord = keys[i];
				if (currentWord.length > 5) {
					countedWords.push([currentWord, map[currentWord]]);
				}
			}

			countedWords.sort((a, b) => b[1] - a[1]);
			countedWords = countedWords.slice(0, 10);

			const trendingKeywordsObj = {};
			trendingKeywordsObj.trendingKeywords = countedWords.map(current => {
				return {
					word: current[0],
					count: current[1]
				};
			});

			postRes.json(trendingKeywordsObj);

			db.close();
		});
	});
};

const getChat = (mongoClient, postReq, postRes) => {
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

			const messages = chatRes.map(message => {
				return {
					avatarId: message.userdetail.avatarID,
					authorName: message.userdetail.displayname,
					date: message.date,
					messageBody: message.messageBody
				};
			});

			const chatObj = {
				numberOfReplies: chatRes.length,
				messages: messages
			};

			dbo.collection(CHATS_COLLECTION).find({ _id: ObjectId(obj.chatId) }).toArray((chatErr, chatRes) => {
				if (chatErr) throw chatErr;
	
				const title = chatRes && chatRes[0] && chatRes[0].chatTitle;
				
				if (title === undefined) {
					console.log("Chat title cannot be found");
				}
				else {
					chatObj.chatTitle = title;
				}

				postRes.json(chatObj);
			});

			db.close();
		});
	});
};

module.exports = {
    getTopics, getChatPreviews, getTrendingPosts, getTrendingKeywords, getChat
};