// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import React, { useState, useEffect } from 'react';
import { withRouter, match } from 'react-router-dom';

import ChatCanvas from "./chat-canvas";

import { IUserContext } from '../UserProvider';
import { baseGetRequest, basePostRequest } from "./../../util/base-requests";

export type MessageType = {
    id: string;
    authorName: string;
    date: string;
    messageBody: string;
}

interface IChatProviderProps {
    match: match<{chatID: string}>;
}

const ChatProvider = (props: IChatProviderProps) => {
    const { match } = props;
    const { chatID } = match.params;

    const [title, setTitle] = useState('');
    const [messages, setMessages] = useState([]);
    const [messageBody, setMessageBody] = useState('');
    const [views, setViews] = useState(0);
    const [replies, setReplies] = useState(0);
    const [loading, setLoading] = useState(true);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessageBody(e.target.value);
    }

    const retrieveChatDataResponseHandler = (data: any) => {
        const messages = data.messages !== undefined ? data.messages : [];
        setTitle(data.chatTitle);
        setMessages(messages);
        setLoading(false);
        setReplies(data.numberOfReplies);
        setViews(data.numberOfViews);
    }
    
    const retrieveChatDataErrorHandler = (error: any) => {
        console.log(error);
    }
    
    const retrieveChatData = () => {
        const params = [
            { ["chatId"]: chatID }
        ];
        baseGetRequest("getChat", params, retrieveChatDataResponseHandler, retrieveChatDataErrorHandler);
    }
    
    const handleSubmitResponseHandler = (data: any) => {
        if (data && data.statusMessage == 1) {
            console.log("Message sent");
        }
        else {
            alert("Message failed to send")
        }
        retrieveChatData();
    }

    const handleSubmitErrorHandler = (error: any) => {
        console.log(error);
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>, userData: IUserContext) => {
        e.preventDefault();

        setMessageBody('');
        setLoading(true);

        const postRequestData = {
            chatId: chatID,
            messageBody: messageBody,
            username: userData.user.userId !== -1 ? userData.user.username : "Anonymous"
        };

        basePostRequest("sendmessage", postRequestData, handleSubmitResponseHandler, handleSubmitErrorHandler);
    }

    useEffect(() => {
        retrieveChatData();
    }, []);

    return (
        <ChatCanvas
            title={title}
            messages={messages}
            messageBody={messageBody}
            views={views}
            replies={replies}
            loading={loading}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
        />
    );
}

export const Chat = withRouter(ChatProvider);