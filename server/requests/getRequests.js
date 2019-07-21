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
};

module.exports = {
    getTopics, getChatPreviews, getChat
};