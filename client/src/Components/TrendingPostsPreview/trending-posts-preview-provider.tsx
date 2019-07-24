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
    postsData: IPostPreviewData[]
}

export class TrendingPostsProvider extends React.Component<ITrendingPostsProviderProps, ITrendingPostsProviderState> {
    constructor(props: ITrendingPostsProviderProps) {
        super(props);
        this.state = {
            postsData: []
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
            />
        );
    }

    componentDidMount = () => {
        this.retrieveChatPreviews();
    }

    retrieveTrendingPostsResponseHandler = (data: any) => {
        this.setState({
            postsData: data && data.chatPreviews
        });
    }

    retrieveTrendingPostsErrorHandler = (error: any) => {
        console.error(error);
    }

    retrieveChatPreviews = () => {
        const params = [{}];
        baseGetRequest("gettrendingposts", params, this.retrieveTrendingPostsResponseHandler, this.retrieveTrendingPostsErrorHandler);
    }
}