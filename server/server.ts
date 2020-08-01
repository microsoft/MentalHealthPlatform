// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// Imports for Express
import express from 'express';
const app = express();
import bodyParser from 'body-parser';

// Imports for MongoDB
import mongodb from 'mongodb';
const mongoClient = mongodb.MongoClient;

// Import requests
import GetRequests from './requests/get-requests';
import PostRequests from './requests/post-requests';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

const port = process.env.PORT || 3000;
app.set('port', port);

const getRequestBuilder = (path: string, request: any) => {
  return app.get(path, (postReq, postRes) =>
    request(mongoClient, postReq, postRes)
  );
};

const postRequestBuilder = (path: string, request: any) => {
  return app.post(path, (postReq, postRes) =>
    request(mongoClient, postReq, postRes)
  );
};

// GET requests
getRequestBuilder("/gettopics", GetRequests.getTopics);
getRequestBuilder("/getchatpreviews", GetRequests.getChatPreviews);
getRequestBuilder("/getchat", GetRequests.getChat);
getRequestBuilder("/gettrendingposts", GetRequests.getTrendingPosts);
getRequestBuilder("/gettrendingkeywords", GetRequests.getTrendingKeywords);
getRequestBuilder("/gettherapists", GetRequests.getTherapists);
getRequestBuilder("/getevents", GetRequests.getEvents);
getRequestBuilder("/getcontacts", GetRequests.getContacts);
getRequestBuilder("/getnews", GetRequests.getNews);

// POST requests
postRequestBuilder("/signup", PostRequests.signUp);
postRequestBuilder("/login", PostRequests.login);
postRequestBuilder("/sendmessage", PostRequests.sendMessage);
postRequestBuilder("/createchat", PostRequests.createChat);
postRequestBuilder("/createcontact", PostRequests.createContact);

app.listen(app.get('port'), () => {
    console.log(`Server is running on Port ${port}...`);
});