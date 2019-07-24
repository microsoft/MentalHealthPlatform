// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import * as classes from "./Message.css";
import { getShortenedTimeAndDate } from '../../util/Helpers';
import profilePicturePlaceholder from '../../images/profile_picture_placeholder.png';

interface IMessageProps {
    isCurrentUser: boolean;
    messageBody: string;
    name: string;
    date: string;
}
    
const renderProfilePicture = (isCurrentUser: boolean) => {
    var profilePictureStyle = {
        marginLeft: isCurrentUser ? "10px" : "0px"
    };

    return (
        <img src={profilePicturePlaceholder} className={classes.ProfilePicture} style={profilePictureStyle} />
    );
};

const renderMessageBody = (isCurrentUser: boolean, messageBody: string) => {
    var messageBodyContainerStyle = {
        backgroundColor: isCurrentUser ? "#F2F2F2" : "rgb(190, 230, 255)"
    };

    return (
        <div className={classes.MessageBodyContainer} style={messageBodyContainerStyle}>
            {messageBody}
        </div>
    );
};

const renderName = (name: string) => {
    return (
        <div className={classes.Name}>
            {name}
        </div>
    );
};

const renderDate = (date: string) => {
    return (
        <div className={classes.MessageDate}>
            {getShortenedTimeAndDate(new Date(date))}
        </div>
    );
};

const Message = (props: IMessageProps) => {
    const { isCurrentUser, messageBody, name, date } = props;

    return isCurrentUser ?
        <div className={classes.MessageContainerOtherUser}>
            {isCurrentUser}
            <div className={classes.MessageDateContainerCurrentUser}>
                {renderMessageBody(isCurrentUser, messageBody)}
                {renderDate(date)}
            </div>
            <div className={classes.ProfilePictureNameContainer}>
                {renderProfilePicture(isCurrentUser)}
                {renderName(name)}
            </div>
        </div> :
        <div className={classes.MessageContainerCurrentUser}>
            <div className={classes.ProfilePictureNameContainer}>
                {renderProfilePicture(isCurrentUser)}
                {renderName(name)}
            </div>
            <div className={classes.MessageDateContainerOtherUser}>
                {renderMessageBody(isCurrentUser, messageBody)}
                {renderDate(date)}
            </div>
        </div>;
}

export default Message;