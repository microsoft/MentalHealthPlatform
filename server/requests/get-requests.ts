import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectID;

import {
	COLLECTIONS,
	STATUS_CODE,
	MONGO_CONSTANTS
} from './../constants';

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

export const getTrendingPosts = (mongoClient: typeof mongodb.MongoClient, postReq: any, postRes: any) => {
	console.log("Getting trending posts...");

	mongoClient.connect(MONGO_CONSTANTS.MONGO_URL, { useNewUrlParser: true }, (err, db) => {
		if (err) throw err;

		const dbo = db.db(MONGO_CONSTANTS.DATABASE_NAME);
		dbo.collection(COLLECTIONS.CHATS_COLLECTION).find().sort({ numberofviews : -1 }).limit(5)
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

export const getTrendingKeywords = (mongoClient: typeof mongodb.MongoClient, postReq: any, postRes: any) => {
	console.log("Getting trending keywords...");
	
	mongoClient.connect(MONGO_CONSTANTS.MONGO_URL, { useNewUrlParser: true }, (err, db) => {
		if (err) throw err;

		const dbo = db.db(MONGO_CONSTANTS.DATABASE_NAME);
		dbo.collection(COLLECTIONS.MESSAGE_COLLECTION).find().sort({ date : -1 }).limit(10)
		.toArray((messageErr, messageRes) => {
			if (messageErr) throw messageErr;

			if (messageRes.length === 0) {
				postRes.json([]);
				return;
			}

			const messages = messageRes.reduce((accumulator, current) => {
				return accumulator += " " + current.messageBody;
			}, "");

			const words = messages.split(" ");

			const map: { [key: string]: number } = {};
			for (const word of words) {
				const currentWord = word.replace("?", "").replace("!", "").replace(".", "").replace(",", "");
				if (map[currentWord]) {
					map[currentWord]++;
				}
				else {
					map[currentWord] = 1;
				}
			}

			interface ICountedWord {
				word: string;
				count: number;
			}

			let countedWords: ICountedWord[] = [];

			const keys = Object.keys(map);
			for (let i = 0; i < keys.length; i++) {
				const currentWord = keys[i];
				if (currentWord.length > 5) {
					countedWords.push({
						word: currentWord,
						count: map[currentWord]
					});
				}
			}

			countedWords.sort((a, b) => b.count - a.count);
			countedWords = countedWords.slice(0, 10);

			const trendingKeywordsObj = {
				trendingKeywords: countedWords
			};

			postRes.json(trendingKeywordsObj);

			db.close();
		});
	});
};

export const getChat = (mongoClient: typeof mongodb.MongoClient, postReq: any, postRes: any) => {
	console.log("Getting chat...");

	const obj = postReq.query;
	mongoClient.connect(MONGO_CONSTANTS.MONGO_URL, { useNewUrlParser: true }, (err, db) => {
		if (err) throw err;

		const dbo = db.db(MONGO_CONSTANTS.DATABASE_NAME);
		dbo.collection(COLLECTIONS.MESSAGE_COLLECTION).aggregate(
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
						chat_id: obj.chatId
					}
				}
			]
		).toArray((chatErr, chatRes) => {
			if (chatErr) throw chatErr;
			
			if (chatRes.length <= 0) {
				postRes.json([]);
				return;
			}

			
			dbo.collection(COLLECTIONS.CHATS_COLLECTION).updateOne(
				{ "chatID": obj.chatId },
				{ $inc: { numberofviews: STATUS_CODE.SUCCESS } }
			);

			const messages = chatRes.map(message => {
				return {
					avatarId: message.userdetail.avatarID,
					authorName: message.userdetail.displayname,
					date: message.date,
					messageBody: message.messageBody
				};
			});

			

			dbo.collection(COLLECTIONS.CHATS_COLLECTION).find({ _id: new ObjectId(obj.chatId) }).toArray((chatErr, chatRes) => {
				if (chatErr) throw chatErr;
	
				const title = chatRes && chatRes[0] && chatRes[0].chatTitle;
				
				if (!title) {
					console.log("Chat title cannot be found");
				}

				const chatObj = {
					numberOfReplies: chatRes.length,
					messages,
					chatTitle: title ?? ""
				};

				postRes.json(chatObj);
			});

			db.close();
		});
	});
};

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
