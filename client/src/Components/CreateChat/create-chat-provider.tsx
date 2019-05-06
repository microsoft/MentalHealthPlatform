// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import CreateChatCanvas from "./create-chat-canvas";

import { IUserContext } from '../App';
import { baseGetRequest, basePostRequest } from "./../../util/base-requests";

interface ICreateChatProviderProps {
    UserContext: React.Context<IUserContext>;
    chatID?: string;
}

interface ICreateChatProviderState {
    inputTitle: string;
    inputDescription: string;
}

class CreateChatProviderClass extends React.Component<RouteComponentProps<{}> & ICreateChatProviderProps, ICreateChatProviderState> {
    constructor(props: RouteComponentProps<{}> & ICreateChatProviderProps) {
        super(props);
        this.state = {
            inputTitle: "",
            inputDescription: ""
        };
    }

    getTopicId = () => {
        let subUrl = this.props.match.url.replace("createChat/", "").replace("createChat", "");        
        
        let list = subUrl.split("/");
        list = list.filter((item) => item != "");

        const topicId = list[list.length - 1].replace("topic", "");
        
        return topicId;
    }

    handleInputTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            inputTitle: e.target.value
        })
    }

    handleInputDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            inputDescription: e.target.value
        })
    }

    isSubmitButtonDisabled = () => {
        return this.state.inputTitle.length > 0 && this.state.inputDescription.length > 0;
    }

    render = () => {
        return (
            <CreateChatCanvas
                inputTitle={this.state.inputTitle}
                inputDescription={this.state.inputDescription}
                isSubmitButtonDisabled={this.isSubmitButtonDisabled}
                handleSubmit={this.handleSubmit}
                handleInputTitleChange={this.handleInputTitleChange}
                handleInputDescriptionChange={this.handleInputDescriptionChange}
            />
        );
    }
    
    handleSubmitResponseHandler = (data: any) => {
        console.log("chat created", data);
        if (data && data.chatId !== undefined) {
            const path = `${this.props.match.url.replace("createChat/", "").replace("createChat", "")}chat/${data.chatId}`;
            this.props.history.push(path);
        }
    }

    handleSubmitErrorHandler = (error: any) => {
        console.log(error);
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>, title: string, description: string) => {
        e.preventDefault();

        const postRequestData = {
            chatTitle: title,
            chatDescription: description,
            topicId: this.getTopicId(),
            username: "Aldo"
        };
        basePostRequest("createchat", postRequestData, this.handleSubmitResponseHandler, this.handleSubmitErrorHandler);
    }
}

export const CreateChat = withRouter(CreateChatProviderClass);