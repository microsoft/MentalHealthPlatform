// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import React, { useState } from 'react';
import { withRouter, match } from 'react-router-dom';
import * as H from 'history';

import CreateChatCanvas from "./create-chat-canvas";
import { basePostRequest } from "./../../util/base-requests";

interface ICreateChatProviderProps {
    match: match<{}>;
    history: H.History;
}

const CreateChatProviderClass = (props: ICreateChatProviderProps) => {
    const { match, history } = props;
    
    const [inputTitle, setInputTitle] = useState("");
    const [inputDescription, setInputDescription] = useState("");

    const getTopicId = () => {
        let subUrl = match.url.replace("createChat/", "").replace("createChat", "");        
        
        let list = subUrl.split("/");
        list = list.filter((item) => item != "");

        const topicId = list[list.length - 1].replace("topic", "");
        
        return topicId;
    }

    const handleInputTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.target.value);
    }

    const handleInputDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputDescription(e.target.value);
    }

    const isSubmitButtonDisabled = () => {
        return inputTitle.length > 0 && inputDescription.length > 0;
    }

    const handleSubmitResponseHandler = (data: any) => {
        if (data && data.chatId !== undefined) {
            const path = `${match.url.replace("createChat/", "").replace("createChat", "")}chat/${data.chatId}`;
            history.push(path);
        }
    }

    const handleSubmitErrorHandler = (error: any) => {
        console.log(error);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>, title: string, description: string) => {
        e.preventDefault();

        const postRequestData = {
            chatTitle: title,
            chatDescription: description,
            topicId: getTopicId(),
            username: "Aldo"
        };
        basePostRequest("createchat", postRequestData, handleSubmitResponseHandler, handleSubmitErrorHandler);
    }

    return (
        <CreateChatCanvas
            inputTitle={inputTitle}
            inputDescription={inputDescription}
            isSubmitButtonDisabled={isSubmitButtonDisabled}
            handleSubmit={handleSubmit}
            handleInputTitleChange={handleInputTitleChange}
            handleInputDescriptionChange={handleInputDescriptionChange}
        />
    );
}

export const CreateChat = withRouter(CreateChatProviderClass);