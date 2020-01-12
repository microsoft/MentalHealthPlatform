import mongodb from 'mongodb';

import {
	COLLECTIONS,
	STATUS_CODE,
	MONGO_CONSTANTS
} from './../constants';

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

export const sendMessage = (mongoClient: typeof mongodb.MongoClient, postReq: any, postRes: any) => {
	console.log("Sending message...");

	const obj = postReq.body;
	mongoClient.connect(MONGO_CONSTANTS.MONGO_URL, { useNewUrlParser: true }, (connerErr, db) => {
		if (connerErr) throw connerErr;		

		const msgObj = {
			chat_id: obj.chatId,
			messageBody: obj.messageBody,
			user_id: obj.username,
			date: new Date(),
			userdetail: {}
		};

		// Insert message into database
		const dbo = db.db(MONGO_CONSTANTS.DATABASE_NAME);
		dbo.collection(COLLECTIONS.MESSAGE_COLLECTION).insertOne(msgObj, (insertErr, insertRes) => {			
			if (insertErr) throw insertErr;
			
			db.close();
			postRes.json({ statusMessage: STATUS_CODE.SUCCESS });
		});
	});
};

export const createChat = (mongoClient: typeof mongodb.MongoClient, postReq: any, postRes: any) => {
	console.log("Creating chat...");

	const obj = postReq.body;
	mongoClient.connect(MONGO_CONSTANTS.MONGO_URL, { useNewUrlParser: true }, (connerErr, db) => {
		if (connerErr) throw connerErr;

		// Create new chat object
		const chatObj = {
			chatTitle: obj.chatTitle,
			user_id: obj.username,
			topic_id: obj.topicId.toString(),
			PostedDate: (new Date()).toString(),
			numberofviews: 0,
			numberofreplies: 0,
			desc: obj.chatDescription
		};

		// Create new message object
		const msgObj = {
			messageBody: obj.chatDescription,
			username: obj.username,
			date: new Date()
		};		

		// Insert newly created chat into database
		const dbo = db.db(MONGO_CONSTANTS.DATABASE_NAME);
		dbo.collection(COLLECTIONS.CHATS_COLLECTION).insertOne(chatObj, (insertChatErr, insertChatRes) => {
			if (insertChatErr) throw insertChatErr;
			
			// Insert message into database
			dbo.collection(COLLECTIONS.MESSAGE_COLLECTION).insertOne(msgObj, (insertMsgErr, insertMsgRes) => {
				db.close();
				postRes.json({
					statusMessage: STATUS_CODE.SUCCESS,
					chatId: insertChatRes.ops[0]._id
				});
			});
		});
	});
};

export const createContact = (mongoClient: typeof mongodb.MongoClient, postReq: any, postRes: any) => {
	console.log("Creating contact...");

	const obj = postReq.body;
	mongoClient.connect(MONGO_CONSTANTS.MONGO_URL, { useNewUrlParser: true }, (connerErr, db) => {
		if (connerErr) throw connerErr;

		// Create new contact object
		const contactObj = {
			title: obj.title,
			desc: obj.desc,
			link: obj.link
		};

		// Insert newly created contact into database
		const dbo = db.db(MONGO_CONSTANTS.DATABASE_NAME);
		dbo.collection(COLLECTIONS.CONTACTS_COLLECTION).insertOne(contactObj, (insertChatErr, insertChatRes) => {
			if (insertChatErr) throw insertChatErr;

			db.close();
			postRes.json({
				statusMessage: STATUS_CODE.SUCCESS,
				chatId: insertChatRes.ops[0]._id
			});
		});
	});
};
