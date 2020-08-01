import mongodb from 'mongodb';

import {
	COLLECTIONS,
	MONGO_CONSTANTS
} from './../../constants';

export const getEvents = (mongoClient: typeof mongodb.MongoClient, postReq: any, postRes: any) => {
	console.log("Getting events...");
	
	mongoClient.connect(MONGO_CONSTANTS.MONGO_URL, { useNewUrlParser: true }, (err, db) => {
		if (err) throw err;

		const dbo = db.db(MONGO_CONSTANTS.DATABASE_NAME);
		dbo.collection(COLLECTIONS.EVENTS_COLLECTION).find().limit(3)
		.toArray((eventsErr, eventsRes) => {
			if (eventsErr) throw eventsErr;
			
			if (eventsRes.length <= 0) {
				postRes.json([]);
				return;
			}

			const eventsObj = {
				events: eventsRes
			};
			postRes.json(eventsObj);

			db.close();
		});
	});
};
