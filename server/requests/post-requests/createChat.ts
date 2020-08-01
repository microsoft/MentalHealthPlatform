import mongodb from 'mongodb';

import {
	COLLECTIONS,
	STATUS_CODE,
	MONGO_CONSTANTS
} from './../../constants';

export const createChat = (mongoClient: typeof mongodb.MongoClient, postReq: any, postRes: any) => {
	console.log("Creating chat...");

	const obj = postReq.body;
	mongoClient.connect(MONGO_CONSTANTS.MONGO_URL, { useNewUrlParser: true }, (connerErr, db) => {
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
			date: new Date()
		};		

		// Insert newly created chat into database
		const dbo = db.db(MONGO_CONSTANTS.DATABASE_NAME);
		dbo.collection(COLLECTIONS.CHATS_COLLECTION).insertOne(chatObj, (insertChatErr, insertChatRes) => {
			if (insertChatErr) throw insertChatErr;
			
			// Insert message into database
			dbo.collection(COLLECTIONS.MESSAGE_COLLECTION).insertOne(msgObj, (insertMsgErr, insertMsgRes) => {
				db.close();
				postRes.json({
					statusMessage: STATUS_CODE.SUCCESS,
					chatId: insertChatRes.ops[0]._id
				});
			});
		});
	});
};
