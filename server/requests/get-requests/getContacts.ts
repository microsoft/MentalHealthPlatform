import mongodb from 'mongodb';

import {
	COLLECTIONS,
	MONGO_CONSTANTS
} from './../../constants';

export const getContacts = (mongoClient: typeof mongodb.MongoClient, postReq: any, postRes: any) => {
	console.log("Getting contacts...");
	
	mongoClient.connect(MONGO_CONSTANTS.MONGO_URL, { useNewUrlParser: true }, (err, db) => {
		if (err) throw err;

		const dbo = db.db(MONGO_CONSTANTS.DATABASE_NAME);
		dbo.collection(COLLECTIONS.CONTACTS_COLLECTION).find()
		.toArray((contactsErr, contactsRes) => {
			if (contactsErr) throw contactsErr;
			
			if (contactsRes.length <= 0) {
				postRes.json([]);
				return;
			}

			const contactsObj = {
				contacts: contactsRes
			};
			postRes.json(contactsObj);

			db.close();
		});
	});
};
