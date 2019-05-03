// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import * as classes from "./Message.css";
import { formatDate } from '../../util/Helpers';
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
        backgroundColor: isCurrentUser ? "#F2F2F2" : "#E2F0D9",
        borderColor: isCurrentUser ? "#BFBFBF" : "#92D050",
        marginLeft: isCurrentUser ? "auto" : 20,
        marginRight: isCurrentUser ? 20 : "auto"
    };

    return (
        <div className={classes.MessageBodyContainer} style={messageBodyContainerStyle}>
            {messageBody}
        </div>
    );
};

const renderNameDate = (name: string, date: string) => {
    return (
        <div className={classes.NameDateContainer}>
            <div className={classes.Name}>
                {name}
            </div>
            <div>
                {formatDate(date)}
            </div>
        </div>
    );
};

const Message = (props: IMessageProps) => {
    const { isCurrentUser, messageBody, name, date } = props;

    return isCurrentUser ?
        <div className={classes.Container}>
            {isCurrentUser}
            {renderMessageBody(isCurrentUser, messageBody)}
            {renderProfilePicture(isCurrentUser)}
            {renderNameDate(name, date)}
        </div> :
        <div className={classes.Container}>
            {renderProfilePicture(isCurrentUser)}
            {renderNameDate(name, date)}
            {renderMessageBody(isCurrentUser, messageBody)}
        </div>;
}

export default Message;