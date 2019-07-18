// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from "react";
import { Link, match } from 'react-router-dom';

import * as classes from "./forum.css";
import InfoCard from "../InfoCard/info-card";

interface IDiscussionPreviewData {
    _id: string;
    chatTitle: string;
    chatDescription: string;
    authorName: string;
    date: string;
    numberOfReplies: number;
    numberOfViews: number;
}

interface IForumCanvasProps {
    forumId: string;
    forumData: IDiscussionPreviewData[];
    match: match<{}>;
}

const ForumCanvas = (props: IForumCanvasProps) => {
    const { forumId, forumData, match } = props;

    if (!forumData) {
        return null;
    }
    
    const infoCards = forumData.map(discussionPreview => {
        return <InfoCard key={discussionPreview._id} data={discussionPreview} match={match} />
    });

    let baseUrl = match.url;
    if (baseUrl.charAt(baseUrl.length - 1) == '/') {
        baseUrl = baseUrl.substring(0, baseUrl.length - 1);
    }

    return (
        <div className={classes.Container}>
            <div className={classes.BodyStyle}>
                <h1 className={classes.ForumTitle}>{"Topic " + forumId}</h1>
                <div style={{justifyContent: "flex-end", display: "flex"}}>
                    <Link to={`${baseUrl}/createChat`}>
                        <button
                            className={classes.CreateChatButton}>
                            <span style={{fontWeight: "bold"}}>+</span>
                            <span style={{}}> Create new discussion</span>
                        </button>
                    </Link>
                </div>
                {infoCards}
            </div>
        </div>
    );
}

export {
    IDiscussionPreviewData, ForumCanvas
};