import mongodb from 'mongodb';

import {
	COLLECTIONS,
	MONGO_CONSTANTS
} from './../../constants';

export const getTrendingKeywords = (mongoClient: typeof mongodb.MongoClient, postReq: any, postRes: any) => {
	console.log("Getting trending keywords...");
	
	mongoClient.connect(MONGO_CONSTANTS.MONGO_URL, { useNewUrlParser: true }, (err, db) => {
		if (err) throw err;

		const dbo = db.db(MONGO_CONSTANTS.DATABASE_NAME);
		dbo.collection(COLLECTIONS.MESSAGE_COLLECTION).find().sort({ date : -1 }).limit(50)
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
			countedWords = countedWords.slice(0, 20);

			const trendingKeywordsObj = {
				trendingKeywords: countedWords
			};

			postRes.json(trendingKeywordsObj);

			db.close();
		});
	});
};
