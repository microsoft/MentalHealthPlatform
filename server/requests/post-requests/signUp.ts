import mongodb from 'mongodb';

import {
	COLLECTIONS,
	STATUS_CODE,
	MONGO_CONSTANTS
} from './../../constants';

export const signUp = (mongoClient: typeof mongodb.MongoClient, postReq: any, postRes: any) => {
	console.log("Signing up...");

	const obj = postReq.body;
	const username = obj.username;

	mongoClient.connect(MONGO_CONSTANTS.MONGO_URL, { useNewUrlParser: true }, (connerErr, db) => {
		if (connerErr) throw connerErr;

		// Verify if user already exists
		const dbo = db.db(MONGO_CONSTANTS.DATABASE_NAME);		
		dbo.collection(COLLECTIONS.USERS_COLLECTION).find({ username }).toArray((findErr, findRes) => {
			if (findErr) throw findErr;

			if (findRes.length != 0) {
				console.log("Username already exists: " + username);
				db.close();
				postRes.json({ statusMessage: STATUS_CODE.FAILURE });
				return;
			}

			// Insert user into database
			dbo.collection(COLLECTIONS.USERS_COLLECTION).insertOne(obj, (insertErr, insertRes) => {
				if (insertErr) throw insertErr;

				console.log("User created: ", username);
				db.close();
				postRes.json({ statusMessage: STATUS_CODE.SUCCESS });
			});
		});
	});
};
