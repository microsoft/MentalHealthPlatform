import mongodb from 'mongodb';

import {
	COLLECTIONS,
	MONGO_CONSTANTS
} from './../../constants';

export const getTherapists = (mongoClient: typeof mongodb.MongoClient, postReq: any, postRes: any) => {
	console.log("Getting therapists...");
	
	mongoClient.connect(MONGO_CONSTANTS.MONGO_URL, { useNewUrlParser: true }, (err, db) => {
		if (err) throw err;

		const dbo = db.db(MONGO_CONSTANTS.DATABASE_NAME);
		dbo.collection(COLLECTIONS.THERAPISTS_COLLECTION).find().limit(3)
		.toArray((therapistsErr, therapistsRes) => {
			if (therapistsErr) throw therapistsErr;
			
			if (therapistsRes.length <= 0) {
				postRes.json([]);
				return;
			}

			const therapistsObj = {
				therapists: therapistsRes
			};
			postRes.json(therapistsObj);

			db.close();
		});
	});
};
