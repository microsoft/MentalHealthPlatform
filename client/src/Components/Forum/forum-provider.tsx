// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from "react";
import { withRouter, RouteComponentProps } from 'react-router-dom';

import ForumCanvas from "./forum-canvas";
import { baseGetRequest } from "./../../util/base-requests";

interface IDiscussionPreviewData {
    chatId: number;
    chatTitle: string;
    chatDescription: string;
    authorName: string;
    date: string;
    numberOfReplies: number;
    numberOfViews: number;
}

interface IForumProviderState {
    forumId: string;
    forumData: IDiscussionPreviewData[];
}

class ForumProviderClass extends React.Component<RouteComponentProps<{}>, IForumProviderState> {
    isUnmounted = false;

    constructor(props: RouteComponentProps<{}>) {
        super(props);
        const forumId = this.obtainForumId(this.props.match.url);
        this.state = {
            forumId: forumId,
            forumData: undefined
        };
    }

    getTopicId = () => {
        let subUrl = this.props.match.url.replace("createChat/", "").replace("createChat", "");        
        
        let list = subUrl.split("/");
        list = list.filter((item) => item != "");

        const topicId = list[list.length - 1].replace("topic", "");
        console.log(topicId);
        return topicId;
    };

    obtainForumId = (url: string) => {
        var regex = /^\/topics\/topic[\d]+[\/]?$/;
        var anythingButNumRegex = /[\/a-zA-Z]+/g;

        if (regex.test(url)) {
            // Checking /topic{num}/ or /topic{num} and nothing after
            return url.replace(anythingButNumRegex, "");
        }

        return null;
    }

    /**
     * Renders forum component
     * @return  {React.Component}   Rendered component
     */
    render = () => {
        return (
            <ForumCanvas
                forumId={this.state.forumId}
                forumData={this.state.forumData}
                match={this.props.match}
            />
        );
    }

    componentDidMount = () => {
        this.retrieveChatPreviews();
    }

    retrieveChatPreviewsResponseHandler = (data: any) => {
        if (!this.isUnmounted) {
            this.setState({
                forumData: data
            });
        }
    }

    retrieveChatPreviewsErrorHandler = (error: any) => {
        console.error(error);
    }

    retrieveChatPreviews = () => {
        const params = [
            {["topicId"]: this.getTopicId()}
        ];
        baseGetRequest("getchatpreviews", params, this.retrieveChatPreviewsResponseHandler, this.retrieveChatPreviewsErrorHandler);
    }

    componentWillUnmount = () => {
        this.isUnmounted = true;
    }
}

export const Forum = withRouter(ForumProviderClass);