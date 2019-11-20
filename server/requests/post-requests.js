const {
	USERS_COLLECTION,
	CHATS_COLLECTION,
	MESSAGE_COLLECTION,
	CONTACTS_COLLECTION,
	MONGO_URL,
	DATABASE_NAME,
	SUCCESS_STATUS_MESSAGE,
	FAILED_STATUS_MESSAGE
} = require('../constants.js');

const signUp = (mongoClient, postReq, postRes) => {
	console.log("Signing up...");

	const obj = postReq.body;
	const username = obj.username;

	mongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (connerErr, db) => {
		if (connerErr) throw connerErr;

		// Verify if user already exists
		const dbo = db.db(DATABASE_NAME);		
		dbo.collection(USERS_COLLECTION).find({ username }).toArray((findErr, findRes) => {
			if (findErr) throw findErr;

			if (findRes.length != 0) {
				console.log("Username already exists: " + username);
				db.close();
				postRes.json({ statusMessage: FAILED_STATUS_MESSAGE });
				return;
			}

			// Insert user into database
			dbo.collection(USERS_COLLECTION).insertOne(obj, (insertErr, insertRes) => {
				if (insertErr) throw insertErr;

				console.log("User created: ", username);
				db.close();
				postRes.json({ statusMessage: SUCCESS_STATUS_MESSAGE });
			});
		});
	});
};

const login = (mongoClient, postReq, postRes) => {
	console.log("Logging in...");

	const obj = postReq.body;
	mongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (connerErr, db) => {
		if (connerErr) throw connerErr;

		// Verify if entry exists in users collection
		const dbo = db.db(DATABASE_NAME);
		dbo.collection(USERS_COLLECTION).find({"pass": obj["pass"]}).toArray((findErr, findRes) => {
			if (findErr) throw findErr;

			if (findRes.length != 0) {
				console.log("Login successful");
				db.close();
				postRes.json({ statusMessage: SUCCESS_STATUS_MESSAGE });
				return;
			}

			console.log("Login failed");
			postRes.json({ statusMessage: FAILED_STATUS_MESSAGE });
		});
	});
};

const sendMessage = (mongoClient, postReq, postRes) => {
	console.log("Sending message...");

	const obj = postReq.body;
	mongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (connerErr, db) => {
		if (connerErr) throw connerErr;		

		const msgObj = {
			chat_id: obj.chatId,
			messageBody: obj.messageBody,
			user_id: obj.username,
			date: new Date(),
			userdetail: {}
		};

		// Insert message into database
		const dbo = db.db(DATABASE_NAME);
		dbo.collection(MESSAGE_COLLECTION).insertOne(msgObj, (insertErr, insertRes) => {			
			if (insertErr) throw insertErr;
			
			db.close();
			postRes.json({ statusMessage: SUCCESS_STATUS_MESSAGE });
		});
	});
};

const createChat = (mongoClient, postReq, postRes) => {
	console.log("Creating chat...");

	const obj = postReq.body;
	mongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (connerErr, db) => {
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
		const dbo = db.db(DATABASE_NAME);
		dbo.collection(CHATS_COLLECTION).insertOne(chatObj, (insertChatErr, insertChatRes) => {
			if (insertChatErr) throw insertChatErr;
			
			// Insert message into database
			dbo.collection(MESSAGE_COLLECTION).insertOne(msgObj, (insertMsgErr, insertMsgRes) => {
				db.close();
				postRes.json({
					statusMessage: SUCCESS_STATUS_MESSAGE,
					chatId: insertChatRes.ops[0]._id
				});
			});
		});
	});
};

const createContact = (mongoClient, postReq, postRes) => {
	console.log("Creating contact...");

	const obj = postReq.body;
	mongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (connerErr, db) => {
		if (connerErr) throw connerErr;

		// Create new contact object
		const contactObj = {
			title: obj.title,
			desc: obj.desc,
			link: obj.link
		};

		// Insert newly created contact into database
		const dbo = db.db(DATABASE_NAME);
		dbo.collection(CONTACTS_COLLECTION).insertOne(contactObj, (insertChatErr, insertChatRes) => {
			if (insertChatErr) throw insertChatErr;

			db.close();
			postRes.json({
				statusMessage: SUCCESS_STATUS_MESSAGE,
				chatId: insertChatRes.ops[0]._id
			});
		});
	});
};

module.exports = {
	signUp,
	login,
	sendMessage,
	createChat,
	createContact
};