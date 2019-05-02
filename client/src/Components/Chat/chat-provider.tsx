// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { withRouter, RouteComponentProps, match } from 'react-router-dom';

import ChatCanvas from "./chat-canvas"

import { BASE_URL } from '../../util/Helpers';
import { IUserContext } from '../App';

export type MessageType = {
    id: string;
    authorName: string;
    date: string;
    messageBody: string;
}

export interface IChatProviderState {
    title: string;
    messages: MessageType[];
    messageBody: string;
    views: number;
    replies: number;
    loading: boolean;
}

export interface IChatProviderProps {
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

    handleSubmit = (e: React.MouseEvent<HTMLButtonElement>, userData: IUserContext) => {
        const { messageBody } = this.state;
        const { chatID } = this.props.match.params;

        e.preventDefault();
        this.setState({
            messageBody: '',
            loading: true
        });

        fetch(`${BASE_URL}/sendmessage`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chatId: chatID,
                messageBody: messageBody,
                username: userData.user.userId !== -1 ? userData.user.username : "Anonymous"
            })
        }).then((response) => {
            const output = response.json();
            return output;
        }).then((data) => {
            if (data && data.statusMessage == 1) {
                console.log("Message sent");
            }
            else {
                alert("Message failed to send")
            }

            this.retrieveChatData();
        });
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

    retrieveChatData = () => {
        const { chatID } = this.props.match.params;

        fetch(`${BASE_URL}/getChat?chatId=${chatID}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            const output = response.json();
            return output;
        }).then((data) => {
            const messages = data.messages !== undefined ? data.messages : [];
            this.setState({
                title: data.chatTitle,
                messages,
                loading: false,
                replies: data.numberOfReplies,
                views: data.numberOfViews
            })
            console.log("Data", data);
        }).catch((error) => {
            console.log(error);
        });
    }

    componentDidMount = () => {
        this.retrieveChatData();
    }
}

export const Chat = withRouter(ChatProviderClass);