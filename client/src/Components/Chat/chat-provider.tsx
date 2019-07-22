// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { withRouter, RouteComponentProps, match } from 'react-router-dom';

import ChatCanvas from "./chat-canvas";

import { IUserContext } from '../App';
import { baseGetRequest, basePostRequest } from "./../../util/base-requests";

export type MessageType = {
    id: string;
    authorName: string;
    date: string;
    messageBody: string;
}

interface IChatProviderState {
    title: string;
    messages: MessageType[];
    messageBody: string;
    views: number;
    replies: number;
    loading: boolean;
}

interface IChatProviderProps {
    UserContext: React.Context<IUserContext>;
    match: match<{chatID: string}>;
    chatID?: string;
}

class ChatProviderClass extends React.Component<RouteComponentProps<{}> & IChatProviderProps, IChatProviderState> {
    constructor(props: RouteComponentProps<{}> & IChatProviderProps) {
        super(props);
        this.state = {
            title: '',
            messages: [],
            messageBody: '',
            views: 0,
            replies: 0,
            loading: true
        };
    }

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            messageBody: e.target.value
        })
    }

    render = () => {
        return (
            <ChatCanvas
                title={this.state.title}
                messages={this.state.messages}
                messageBody={this.state.messageBody}
                views={this.state.views}
                replies={this.state.replies}
                loading={this.state.loading}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    handleSubmitResponseHandler = (data: any) => {
        if (data && data.statusMessage == 1) {
            console.log("Message sent");
        }
        else {
            alert("Message failed to send")
        }

        this.retrieveChatData();
    }

    handleSubmitErrorHandler = (error: any) => {
        console.log(error);
    }

    handleSubmit = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>, userData: IUserContext) => {
        const { messageBody } = this.state;
        const { chatID } = this.props.match.params;

        e.preventDefault();
        this.setState({
            messageBody: '',
            loading: true
        });

        const postRequestData = {
            chatId: chatID,
            messageBody: messageBody,
            username: userData.user.userId !== -1 ? userData.user.username : "Anonymous"
        };

        basePostRequest("sendmessage", postRequestData, this.handleSubmitResponseHandler, this.handleSubmitErrorHandler);
    }

    retrieveChatDataResponseHandler = (data: any) => {
        const messages = data.messages !== undefined ? data.messages : [];
        this.setState({
            title: data.chatTitle,
            messages,
            loading: false,
            replies: data.numberOfReplies,
            views: data.numberOfViews
        })
        console.log("Data", data);
    }

    retrieveChatDataErrorHandler = (error: any) => {
        console.log(error);
    }

    retrieveChatData = () => {
        const { chatID } = this.props.match.params;
        const params = [
            { ["chatId"]: chatID}
        ];
        
        baseGetRequest("getChat", params, this.retrieveChatDataResponseHandler, this.retrieveChatDataErrorHandler);
    }

    componentDidMount = () => {
        this.retrieveChatData();
    }
}

export const Chat = withRouter(ChatProviderClass);