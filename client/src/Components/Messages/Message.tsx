// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { formatDate } from '../../util/Helpers';
import * as classes from "./Message.css";

import profilePicturePlaceholder from '../../images/profile_picture_placeholder.png';

export interface IMessageProps {
    isCurrentUser: boolean;
    messageBody: string;
    name: string;
    date: string;
}

export class Message extends React.Component<IMessageProps, {}> {
    
    renderProfilePicture() {
        var profilePictureStyle = {
            marginLeft: this.props.isCurrentUser ? "10px" : "0px"
        };

        return (
            <img src={profilePicturePlaceholder} className={classes.ProfilePicture} style={profilePictureStyle}/>
        );
    };

    renderMessageBody() {
        var messageBodyContainerStyle = {
            backgroundColor: this.props.isCurrentUser ? "#F2F2F2" : "#E2F0D9",
            borderColor: this.props.isCurrentUser ? "#BFBFBF" : "#92D050",
            marginLeft: this.props.isCurrentUser ? "auto" : 20,
            marginRight: this.props.isCurrentUser ? 20 : "auto"
        };

        return (
            <div className={classes.MessageBodyContainer} style={messageBodyContainerStyle}>
                {this.props.messageBody}
            </div>
        );
    };

    renderNameDate() {
        return (
            <div className={classes.NameDateContainer}>
                <div className={classes.Name}>
                    {this.props.name}
                </div>
                <div>
                    {formatDate(this.props.date)}
                </div>
            </div>
        );
    };

    renderMessage(){
        return this.props.isCurrentUser ?
            <div className={classes.Container}>
                {this.props.isCurrentUser}
                {this.renderMessageBody()}
                {this.renderProfilePicture()}
                {this.renderNameDate()}
            </div> :
            <div className={classes.Container}>
                {this.renderProfilePicture()}
                {this.renderNameDate()}
                {this.renderMessageBody()}
            </div>;
    }

    render() {
        return this.renderMessage();
    }
}