// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import React, { useState, useEffect } from "react";
import { withRouter, match } from 'react-router-dom';

import { ForumCanvas } from "./forum-canvas";
import { baseGetRequest } from "./../../util/base-requests";

interface IForumProviderProps {
    match: match<{}>;
}

const ForumProviderClass = (props: IForumProviderProps) => {
    const [forumData, setForumData] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

    const { match } = props;

    const getTopicId = () => {
        let subUrl = match.url.replace("createChat/", "").replace("createChat", "");
        
        let list = subUrl.split("/");
        list = list.filter((item) => item != "");

        const topicId = list[list.length - 1].replace("topic", "");
        return topicId;
    };

    const retrieveChatPreviewsResponseHandler = (data: any) => {
        setForumData(data);
        setIsLoading(false);
    }

    const retrieveChatPreviewsErrorHandler = (error: any) => {
        console.error(error);
        setIsLoading(false);
    }

    const retrieveChatPreviews = () => {
        const params = [
            {["topicId"]: getTopicId()}
        ];
        baseGetRequest("getchatpreviews", params, retrieveChatPreviewsResponseHandler, retrieveChatPreviewsErrorHandler);
    }

    useEffect(() => {
        retrieveChatPreviews();
    }, []);

    return (
        <ForumCanvas
            forumData={forumData}
            match={match}
            isLoading={isLoading}
        />
    );
}

export const Forum = withRouter(ForumProviderClass);