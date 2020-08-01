import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectID;

import {
	COLLECTIONS,
	STATUS_CODE,
	MONGO_CONSTANTS
} from './../../constants';

export const getChat = (mongoClient: typeof mongodb.MongoClient, postReq: any, postRes: any) => {
	console.log("Getting chat...");

	const obj = postReq.query;
	mongoClient.connect(MONGO_CONSTANTS.MONGO_URL, { useNewUrlParser: true }, (err, db) => {
		if (err) throw err;

		const dbo = db.db(MONGO_CONSTANTS.DATABASE_NAME);
		dbo.collection(COLLECTIONS.MESSAGE_COLLECTION).aggregate(
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

			
			dbo.collection(COLLECTIONS.CHATS_COLLECTION).updateOne(
				{ "chatID": obj.chatId },
				{ $inc: { numberofviews: STATUS_CODE.SUCCESS } }
			);

			const messages = chatRes.map(message => {
				return {
					avatarId: message.userdetail.avatarID,
					authorName: message.userdetail.displayname,
					date: message.date,
					messageBody: message.messageBody
				};
			});

			dbo.collection(COLLECTIONS.CHATS_COLLECTION).find({ _id: new ObjectId(obj.chatId) }).toArray((chatErr, chatRes) => {
				if (chatErr) throw chatErr;
	
				const title = chatRes && chatRes[0] && chatRes[0].chatTitle;
				
				if (!title) {
					console.log("Chat title cannot be found");
				}

				const chatObj = {
					numberOfReplies: chatRes.length,
					messages,
					chatTitle: title ?? ""
				};

				postRes.json(chatObj);
			});

			db.close();
		});
	});
};
