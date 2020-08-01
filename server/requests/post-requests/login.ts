import mongodb from 'mongodb';

import {
	COLLECTIONS,
	STATUS_CODE,
	MONGO_CONSTANTS
} from './../../constants';

export const login = (mongoClient: typeof mongodb.MongoClient, postReq: any, postRes: any) => {
	console.log("Logging in...");

	const obj = postReq.body;
	mongoClient.connect(MONGO_CONSTANTS.MONGO_URL, { useNewUrlParser: true }, (connerErr, db) => {
		if (connerErr) throw connerErr;

		// Verify if entry exists in users collection
		const dbo = db.db(MONGO_CONSTANTS.DATABASE_NAME);
		dbo.collection(COLLECTIONS.USERS_COLLECTION).find({"pass": obj["pass"]}).toArray((findErr, findRes) => {
			if (findErr) throw findErr;

			if (findRes.length != 0) {
				console.log("Login successful");
				db.close();
				postRes.json({ statusMessage: STATUS_CODE.SUCCESS });
				return;
			}

			console.log("Login failed");
			postRes.json({ statusMessage: STATUS_CODE.FAILURE });
		});
	});
};
