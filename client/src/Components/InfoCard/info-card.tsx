// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from "react";
import { Link, match } from 'react-router-dom';

import Icon from '../Icon/Icon';
import * as classes from "./info-card.css";
import profilePicturePlaceholder from './../../images/profile_picture_placeholder.png';
import { getShortenedTimeAndDate } from '../../util/Helpers';
import { LocalizationContext } from './../LocalizationProvider';

type InfoCardDataType = {
    _id: string;
    chatTitle: string;
    chatDescription: string;
    authorName: string;
    numberOfViews: number;
    numberOfReplies: number;
    postedDate?: string;
};

interface IInfocardProps {
    key: string;
    match: match<{}>;
    data?: InfoCardDataType;
}

const InfoCard = (props: IInfocardProps): JSX.Element => {
    const { data, match } = props;
    let baseUrl = match.url;
    if (baseUrl.charAt(baseUrl.length - 1) == '/') {
        baseUrl = baseUrl.substring(0, baseUrl.length - 1);
    }

    const { getLocalizedString } = React.useContext(LocalizationContext);

    return (
        <Link className={classes.InfoCardLinkContainer} to={`${baseUrl}/chat/${data._id}`}>
            <div className={classes.InfoCardContainer}>
                <div style={{flex: 1}}>
                    <div className={classes.Title}>{data.chatTitle}</div>
                    <div>{data.chatDescription}</div>
                </div>
                <div style={{marginLeft: 32, display: "flex", flexDirection: "row"}}>
                    <img src={profilePicturePlaceholder} className={classes.ProfilePicture}/>
                    <div style={{display: "flex", flexDirection: "column", marginLeft: 8}}>
                        <div className={classes.Name}>{data.authorName}</div>
                        <div>{getShortenedTimeAndDate(new Date(data.postedDate))}</div>
                    </div>
                </div>
                <div style={{marginLeft: 32}}>
                    <table>
                        <tbody>
                            <Icon type='replies' count={data.numberOfReplies || 0} text={getLocalizedString("CHAT_INFO_REPLIES")} />
                            <Icon type='views' count={data.numberOfViews || 0} text={getLocalizedString("CHAT_INFO_VIEWS")} />
                        </tbody>
                    </table>
                </div>
            </div>
        </Link>
    )
}

export default InfoCard;