// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { Link } from 'react-router-dom';

import * as classes from "./trending-posts-preview.css";
import { IPostPreviewData } from './trending-posts-preview-provider';
import DashboardTile from './../DashboardTile/dashboard-tile';
import message_icon from './../../images/message_icon.png';
import { LocalizationContext } from './../LocalizationProvider';

interface ITrendingPostsPreviewProps {
    postsData: IPostPreviewData[],
    isLoading: boolean
}

const NUMBER_OF_TRENDING_POSTS_PREVIEWS = 10;

const renderPost = (postData: IPostPreviewData, key: number) => {
    const topicId = postData.topic_id;
    const chatId = postData.chat_id;
    const url = `/topics/topic${topicId}/chat/${chatId}`;
    return (
        <Link key={key} to={url} className={classes.TrendingPostsPreviewMessageLink}>
            <div className={classes.TrendingPostsPreviewMessage}>
                <img src={message_icon} className={classes.TrendingPostsPreviewImage}/>
                <div className={classes.TrendingPostsPreviewLabel}>
                    <label style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5, cursor: "pointer" }}>{postData.title}</label>
                    <label style={{ fontSize: 16, cursor: "pointer" }}>{postData.description}</label>
                </div>      
            </div>
        </Link>
    );
};

const renderAllPosts = (postsData: IPostPreviewData[]) => {
    const posts = [];
    for (let i = 0; i < Math.min(NUMBER_OF_TRENDING_POSTS_PREVIEWS, postsData.length); i++) {
        posts.push(renderPost(postsData[i], i));
    }
    return posts;
};

const TrendingPostsPreview = (props: ITrendingPostsPreviewProps) => {
    const {
        postsData,
        isLoading
    } = props;

    const { getLocalizedString } = React.useContext(LocalizationContext);

    return (
        <DashboardTile
            buttonProps={{
                link: `/topics`,
                label: getLocalizedString("DASHBOARD_PREVIEW_TRENDING_POSTS_BUTTON"),
                isBlueBackground: false,
                isCentered: false
            }}
            header={getLocalizedString("DASHBOARD_PREVIEW_THRENDING_POSTS_HEADER")}
            isLoading={isLoading}
        >
            {renderAllPosts(postsData)}
        </DashboardTile>
    );
};

export default TrendingPostsPreview;