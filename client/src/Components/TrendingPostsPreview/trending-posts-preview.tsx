// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import message_icon from './../../images/message_icon.png';
import * as classes from "./trending-posts-preview.css";

interface ITrendingPostsPreviewProps {
}

interface ITrendingMessagesData {
    icon: any;
    title: string;
    message: string;
}

const trendingMessagesData = [
    {
        icon: message_icon,
        title: "Techniques for reducing stress",
        description: "What are your favorite techniques for reducing stress?"
    },
    {
        icon: message_icon,
        title: "Any useful meditation apps?",
        description: "Need a breather from work these days..."
    },
    {
        icon: message_icon,
        title: "Coping with stress at work",
        description: "My job is very stressful. I have many deadlines coming and it is becoming overwhelming. Anyone have some..."
    },
    {
        icon: message_icon,
        title: "Family Stress",
        description: "My husband and I are having financial and work issues. I don't want our children to be worried. Does anyone..."
    }
];


const TrendingPostsPreview = (props: ITrendingPostsPreviewProps) => {
    const {
    } = props;

    return (
        <div>
            <h3>Trending posts in your network</h3>
            <label>Posts based on your preferences</label>
            <div className={classes.TrendingPostsPreviewMessage}>
                <img src={trendingMessagesData[0].icon} className={classes.TrendingPostsPreviewImage}/>
                <div className={classes.TrendingPostsPreviewLabel}>
                    <label>{trendingMessagesData[0].title}</label>
                    <label>{trendingMessagesData[0].description}</label>
                </div>      
            </div>
            <div className={classes.TrendingPostsPreviewMessage}>
                <img src={trendingMessagesData[1].icon} className={classes.TrendingPostsPreviewImage}/>
                <div className={classes.TrendingPostsPreviewLabel}>
                    <label>{trendingMessagesData[1].title}</label>
                    <label>{trendingMessagesData[1].description}</label>
                </div>      
            </div>
            <div className={classes.TrendingPostsPreviewMessage}>
                <img src={trendingMessagesData[2].icon} className={classes.TrendingPostsPreviewImage}/>
                <div className={classes.TrendingPostsPreviewLabel}>
                    <label>{trendingMessagesData[2].title}</label>
                    <label>{trendingMessagesData[2].description}</label>
                </div>      
            </div>
            <div className={classes.TrendingPostsPreviewMessage}>
                <img src={trendingMessagesData[3].icon} className={classes.TrendingPostsPreviewImage}/>
                <div className={classes.TrendingPostsPreviewLabel}>
                    <label>{trendingMessagesData[3].title}</label>
                    <label>{trendingMessagesData[3].description}</label>
                </div>      
            </div>
        </div>
        
    );
};

export default TrendingPostsPreview;