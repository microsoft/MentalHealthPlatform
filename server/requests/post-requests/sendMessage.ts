import mongodb from 'mongodb';

import {
	COLLECTIONS,
	STATUS_CODE,
	MONGO_CONSTANTS
} from './../../constants';

export const sendMessage = (mongoClient: typeof mongodb.MongoClient, postReq: any, postRes: any) => {
	console.log("Sending message...");

	const obj = postReq.body;
	mongoClient.connect(MONGO_CONSTANTS.MONGO_URL, { useNewUrlParser: true }, (connerErr, db) => {
		if (connerErr) throw connerErr;		

		const msgObj = {
			chat_id: obj.chatId,
			messageBody: obj.messageBody,
			user_id: obj.username,
			date: new Date(),
			userdetail: {}
		};

		// Insert message into database
		const dbo = db.db(MONGO_CONSTANTS.DATABASE_NAME);
		dbo.collection(COLLECTIONS.MESSAGE_COLLECTION).insertOne(msgObj, (insertErr, insertRes) => {			
			if (insertErr) throw insertErr;
			
			db.close();
			postRes.json({ statusMessage: STATUS_CODE.SUCCESS });
		});
	});
};
