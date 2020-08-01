import mongodb from 'mongodb';

import {
	COLLECTIONS,
	MONGO_CONSTANTS
} from './../../constants';

export const getTrendingPosts = (mongoClient: typeof mongodb.MongoClient, postReq: any, postRes: any) => {
	console.log("Getting trending posts...");

	mongoClient.connect(MONGO_CONSTANTS.MONGO_URL, { useNewUrlParser: true }, (err, db) => {
		if (err) throw err;

		const dbo = db.db(MONGO_CONSTANTS.DATABASE_NAME);
		dbo.collection(COLLECTIONS.CHATS_COLLECTION).find().sort({ numberofviews : -1 }).limit(10)
		.toArray((chatErr, chatRes) => {
			if (chatErr) throw chatErr;

			if (chatRes.length === 0) {
				postRes.json([]);
				return;
			}

			const chatPreviews = chatRes.map(chat => {
				return {
					title: chat.chatTitle,
					description: chat.desc,
					chat_id: chat._id,
					topic_id: chat.topic_id
				};
			});

			const trendingPostsObj = {
				chatPreviews
			};

			postRes.json(trendingPostsObj);

			db.close();
		});
	});
};
