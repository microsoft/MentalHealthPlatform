// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import React, { useState, useEffect } from "react";

import { baseGetRequest } from "./../../util/base-requests";
import TrendingPostsCanvas from './trending-posts-preview-canvas';

export interface IPostPreviewData {
    icon: any;
    title: string;
    description: string;
    chat_id: string;
    topic_id: string;
};

export const TrendingPostsProvider = () => {
    const [postsData, setPostsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const retrieveTrendingPostsResponseHandler = (data: any) => {
        setPostsData(data && data.chatPreviews);
        setIsLoading(false);
    }

    const retrieveTrendingPostsErrorHandler = (error: any) => {
        console.error(error);
        setIsLoading(false);
    }

    const retrieveTrendingPosts = () => {
        const params = [{}];
        baseGetRequest("gettrendingposts", params, retrieveTrendingPostsResponseHandler, retrieveTrendingPostsErrorHandler);
    }

    useEffect(() => {
        retrieveTrendingPosts();
    }, []);

    return (
        <TrendingPostsCanvas
            postsData={postsData}
            isLoading={isLoading}
        />
    );
}