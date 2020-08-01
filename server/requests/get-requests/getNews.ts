import mongodb from 'mongodb';

import {
	COLLECTIONS,
	MONGO_CONSTANTS
} from './../../constants';

export const getNews = (mongoClient: typeof mongodb.MongoClient, postReq: any, postRes: any) => {
	console.log("Getting news...");
	
	mongoClient.connect(MONGO_CONSTANTS.MONGO_URL, { useNewUrlParser: true }, (err, db) => {
		if (err) throw err;

		const dbo = db.db(MONGO_CONSTANTS.DATABASE_NAME);
		dbo.collection(COLLECTIONS.NEWS_COLLECTION).find()
		.toArray((newsErr, newsRes) => {
			if (newsErr) throw newsErr;
			
			if (newsRes.length <= 0) {
				postRes.json([]);
				return;
			}

			const newsObj = {
				news: newsRes
			};
			postRes.json(newsObj);

			db.close();
		});
	});
};
