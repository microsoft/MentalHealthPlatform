// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from "react";
import { Link, match } from 'react-router-dom';

import * as classes from "./forum.css";
import InfoCard from "../InfoCard/info-card";
import { LocalizationContext } from './../LocalizationProvider';
import LoadingBubbles from './../LoadingBubbles/loading-bubbles';

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
    forumData: {
        chatTitle: string,
        chatPreviews: IDiscussionPreviewData[]
    };
    match: match<{}>;
    isLoading: boolean;
}

const ForumCanvas = (props: IForumCanvasProps) => {
    const { forumData, match, isLoading } = props;

    const { getLocalizedString } = React.useContext(LocalizationContext);

    if (isLoading) {
        return (
            <div className={classes.ForumContainer}>
                <div style={{ width: "80%", display: "flex", flexDirection: "column", fontFamily: "Calibri" }}>
                    <LoadingBubbles isLoading={true} containerStyles={{width: "100%", height: "100%"}} bubblesWidth={60} bubblesHeight={60} />
                </div>
            </div>
        );
    }

    if (!(forumData && forumData.chatPreviews)) {
        return null;
    }
    
    const infoCards = forumData.chatPreviews.map(discussionPreview => {
        return <InfoCard key={discussionPreview._id} data={discussionPreview} match={match} />
    });

    let baseUrl = match.url;
    if (baseUrl.charAt(baseUrl.length - 1) == '/') {
        baseUrl = baseUrl.substring(0, baseUrl.length - 1);
    }

    return (
        <div className={classes.ForumContainer}>
            <div style={{ width: "80%", display: "flex", flexDirection: "column", fontFamily: "Calibri" }}>
                <h1 className={classes.ForumTitle} style={{ textAlign: "center" }}>{forumData.chatTitle}</h1>
                <div style={{justifyContent: "flex-end", display: "flex"}}>
                    <Link to={`${baseUrl}/createChat`}>
                        <button
                            className={classes.CreateChatButton}>
                            <span style={{fontWeight: "bold"}}>+</span>
                            <span style={{fontFamily: "Calibri", marginLeft: 8}}>{getLocalizedString("FORUM_CREATE_BUTTON_LABEL")}</span>
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