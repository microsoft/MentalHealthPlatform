// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// Imports for Express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Imports for MongoDB
const mongoClient = require('mongodb').MongoClient;

// Import requests
const { getTopics, getChatPreviews, getTrendingPosts, getTrendingKeywords, getChat } = require('./requests/get-requests.js');
const { signUp, login, sendMessage, createChat } = require('./requests/post-requests');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

const port = process.env.PORT || 3000;
app.set('port', port);

// GET requests
app.get('/gettopics', (postReq, postRes) => getTopics(mongoClient, postReq, postRes));
app.get('/getchatpreviews', (postReq, postRes) => getChatPreviews(mongoClient, postReq, postRes));
app.get('/getchat', (postReq, postRes) => getChat(mongoClient, postReq, postRes));
app.get('/gettrendingposts', (postReq, postRes) => getTrendingPosts(mongoClient, postReq, postRes));
app.get('/gettrendingkeywords', (postReq, postRes) => getTrendingKeywords(mongoClient, postReq, postRes));

// POST requests
app.post('/signup', (postReq, postRes) => signUp(mongoClient, postReq, postRes));
app.post('/login', (postReq, postRes) => login(mongoClient, postReq, postRes));
app.post('/sendmessage', (postReq, postRes) => sendMessage(mongoClient, postReq, postRes));
app.post('/createchat', (postReq, postRes) => createChat(mongoClient, postReq, postRes));

app.listen(app.get('port'), () => {
    console.log(`Server is running on Port ${port}...`);
});