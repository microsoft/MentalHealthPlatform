import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectID;

import {
	COLLECTIONS,
	MONGO_CONSTANTS
} from './../../constants';

export const getChatPreviews = (mongoClient: typeof mongodb.MongoClient, postReq: any, postRes: any) => {
	console.log("Getting chat previews...");

	const obj = postReq.query;

	const { topicId } = obj;

	mongoClient.connect(MONGO_CONSTANTS.MONGO_URL, { useNewUrlParser: true }, (err, db) => {
		if (err) throw err;

		const dbo = db.db(MONGO_CONSTANTS.DATABASE_NAME);
		dbo.collection(COLLECTIONS.CHATS_COLLECTION).aggregate(
			[
				{
					$lookup: {
						from: 'Users',
						localField: 'user_id',
						foreignField: '_id',
						as: 'userdetail'
					}
				},
				{
					$unwind: {
						path: "$userdetail",
						preserveNullAndEmptyArrays: false
					}
				},
				{
					$match: {
						topic_id: topicId
					}
				}
			]
		).toArray((chatErr, chatRes) => {
			if (chatErr) throw chatErr;

			if (chatRes.length === 0) {
				postRes.json([]);
				return;
			}			

			const chatPreviews =  chatRes.map(chat => {
				return {
					_id: chat._id,
					avatarId: chat.userdetail.avatarID,
					chatId: chat.topic_id,
					chatTitle: chat.chatTitle,
					chatDescription: chat.desc,
					authorName: chat.userdetail.displayname,
					numberOfViews: chat.numberofviews,
					numberOfReplies: chat.numberofreplies,
					postedDate: chat.PostedDate
				};
			});

			dbo.collection(COLLECTIONS.TOPICS_COLLECTION).find({ _id: new ObjectId(obj.topicId) }).toArray((topicErr, topicRes) => {
				if (topicErr) throw topicErr;
	
				const title = topicRes?.[0]?.topicTitle;
				
				if (title === undefined) {
					console.log("Topic title cannot be found");
				}
				
				const chatPreviewsObj = {
					chatPreviews,
					chatTitle: title ?? ""
				};

				postRes.json(chatPreviewsObj);
			});

			db.close();
		});
	});
};
