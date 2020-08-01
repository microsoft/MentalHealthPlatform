import mongodb from 'mongodb';

import {
	COLLECTIONS,
	MONGO_CONSTANTS
} from './../../constants';

export const getTopics = (mongoClient: typeof mongodb.MongoClient, postReq: any, postRes: any) => {
	console.log("Retrieving topics...");
	mongoClient.connect(MONGO_CONSTANTS.MONGO_URL, { useNewUrlParser: true }, (connerErr, db) => {
		if (connerErr) throw connerErr;

		const dbo = db.db(MONGO_CONSTANTS.DATABASE_NAME);
		dbo.collection(COLLECTIONS.TOPICS_COLLECTION).find().toArray((findErr, findRes) => {
			if (findErr) throw findErr;

			db.close();
			postRes.json(findRes);
		});
	});
};
