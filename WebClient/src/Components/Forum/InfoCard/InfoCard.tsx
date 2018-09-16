import * as React from "react";
import { Link, match } from 'react-router-dom';
import {Icon} from '../../Icon/Icon';
import * as classes from "./InfoCard.css";

import profilePicturePlaceholder from './../../../images/profile_picture_placeholder.png';

export type InfoCardDataType = {
    chatId: string;
    chatTitle: string;
    chatDescription: string;
    authorName: string;
    // date: string;
    postedDate: string;
    // numberOfReplies: number;
    numberOfViews: number;
};

export interface IInfocardProps {
    key: string;
    data: InfoCardDataType;
    match: match<{}>
}

export const InfoCard: React.SFC<IInfocardProps> = (props: IInfocardProps): JSX.Element => {
    const { data, match } = props;
    let baseUrl = match.url;
    if (baseUrl.charAt(baseUrl.length - 1) == '/') {
        baseUrl = baseUrl.substring(0, baseUrl.length - 1);
    }

    return (
        <Link to={`${baseUrl}/chat/${data.chatId}`} style={{textDecoration: "none", color: "#333333"}}>
            <div className={classes.InfoCardContainer}>
                <div style={{flex: 1}}>
                    <div className={classes.Title}>{data.chatTitle}</div>
                    <div>{data.chatDescription}</div>
                </div>
                <div style={{marginLeft: 32, display: "flex", flexDirection: "row"}}>
                    <img src={profilePicturePlaceholder} className={classes.ProfilePicture}/>
                    <div style={{display: "flex", flexDirection: "column", marginLeft: 8}}>
                        <div className={classes.Name}>{data.authorName}</div>
                        <div>{data.postedDate}</div>
                    </div>
                </div>
                <div style={{marginLeft: 32}}>
                    {/* <Icon type='replies' count={data.numberOfReplies || 0} text='replies' /> */}
                    <Icon type='views' count={data.numberOfViews || 0} text='views' />
                </div>
            </div>
        </Link>
    )
}
