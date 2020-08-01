import mongodb from 'mongodb';

import {
	COLLECTIONS,
	STATUS_CODE,
	MONGO_CONSTANTS
} from './../../constants';

export const createContact = (mongoClient: typeof mongodb.MongoClient, postReq: any, postRes: any) => {
	console.log("Creating contact...");

	const obj = postReq.body;
	mongoClient.connect(MONGO_CONSTANTS.MONGO_URL, { useNewUrlParser: true }, (connerErr, db) => {
		if (connerErr) throw connerErr;

		// Create new contact object
		const contactObj = {
			title: obj.title,
			desc: obj.desc,
			link: obj.link
		};

		// Insert newly created contact into database
		const dbo = db.db(MONGO_CONSTANTS.DATABASE_NAME);
		dbo.collection(COLLECTIONS.CONTACTS_COLLECTION).insertOne(contactObj, (insertChatErr, insertChatRes) => {
			if (insertChatErr) throw insertChatErr;

			db.close();
			postRes.json({
				statusMessage: STATUS_CODE.SUCCESS,
				chatId: insertChatRes.ops[0]._id
			});
		});
	});
};
