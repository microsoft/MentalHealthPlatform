// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import message_icon from './../../images/message_icon.png';
import * as classes from "./trending-posts-preview.css";
import { IPostPreviewData } from './trending-posts-preview-provider';
import { Header } from './../Dashboard/dashboard.css';

interface ITrendingPostsPreviewProps {
    postsData: IPostPreviewData[]
}

const renderTrendingPostPreview = (postData: IPostPreviewData, key: number) => {
    return (
        <div key={key} className={classes.TrendingPostsPreviewMessage}>
            <img src={message_icon} className={classes.TrendingPostsPreviewImage}/>
            <div className={classes.TrendingPostsPreviewLabel}>
                <label style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}>{postData.title}</label>
                <label style={{ fontSize: 16 }}>{postData.description}</label>
            </div>      
        </div>
    );
};

const TrendingPostsPreview = (props: ITrendingPostsPreviewProps) => {
    const {
        postsData
    } = props;

    const posts = [];
    for (let i = 0; i < postsData.length; i++) {
        posts.push(renderTrendingPostPreview(postsData[i], i));
    }

    return (
        <div>
            <div className={Header}>Trending posts in your network</div>
            <div style={{ paddingBottom: "15px", borderBottom: "1px solid #CCCCCC" }}>
                <label style={{ fontStyle: "italic" }}>Posts based on your preferences</label>
            </div>
            {posts}
        </div>  
    );
};

export default TrendingPostsPreview;