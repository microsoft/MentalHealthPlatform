// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from "react";

import { baseGetRequest } from "./../../util/base-requests";
import TrendingPostsCanvas from './trending-posts-preview-canvas';

export interface IPostPreviewData {
    icon: any;
    title: string;
    description: string;
    chat_id: string;
    topic_id: string;
};

interface ITrendingPostsProviderProps {
}

interface ITrendingPostsProviderState {
    postsData: IPostPreviewData[],
    isLoading: boolean;
}

export class TrendingPostsProvider extends React.Component<ITrendingPostsProviderProps, ITrendingPostsProviderState> {
    constructor(props: ITrendingPostsProviderProps) {
        super(props);
        this.state = {
            postsData: [],
            isLoading: true
        };
    }

    /**
     * Renders forum component
     * @return  {React.Component}   Rendered component
     */
    render = () => {
        return (
            <TrendingPostsCanvas
                postsData={this.state.postsData}
                isLoading={this.state.isLoading}
            />
        );
    }

    componentDidMount = () => {
        this.retrieveTrendingPosts();
    }

    retrieveTrendingPostsResponseHandler = (data: any) => {
        this.setState({
            postsData: data && data.chatPreviews,
            isLoading: false
        });
    }

    retrieveTrendingPostsErrorHandler = (error: any) => {
        console.error(error);
        this.setState({
            isLoading: false
        });
    }

    retrieveTrendingPosts = () => {
        const params = [{}];
        baseGetRequest("gettrendingposts", params, this.retrieveTrendingPostsResponseHandler, this.retrieveTrendingPostsErrorHandler);
    }
}