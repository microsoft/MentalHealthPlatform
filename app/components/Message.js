import React from 'react';

import { formatDate } from '../util/Helpers';
import messageStyles  from './MessageStyles';

import profilePicturePlaceholder from './../images/profile_picture_placeholder.png';

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderProfilePicture() {
        var profilePictureStyle = Object.assign({}, messageStyles.profilePictureStyle, {
            marginLeft: this.props.isCurrentUser ? "10px" : "0px"
        });

        return (
            <img src={profilePicturePlaceholder} style={profilePictureStyle}/>
        );
    };

    renderMessageBody() {
        var messageBodyContainerStyle = Object.assign({}, messageStyles.messageBodyContainerStyle, {
            backgroundColor: this.props.isCurrentUser ? "#F2F2F2" : "#E2F0D9",
            borderColor: this.props.isCurrentUser ? "#BFBFBF" : "#92D050",
            marginLeft: this.props.isCurrentUser ? "auto" : 20,
            marginRight: this.props.isCurrentUser ? 20 : "auto"
        });

        return (
            <div style={messageBodyContainerStyle}>
                {this.props.messageBody}
            </div>
        );
    };

    renderNameDate() {
        return (
            <div style={messageStyles.nameDateContainerStyle}>
                <div style={messageStyles.nameStyle}>
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
            <div style={messageStyles.containerStyle}>
                {this.props.isCurrentUser}
                {this.renderMessageBody()}
                {this.renderProfilePicture()}
                {this.renderNameDate()}
            </div> :
            <div style={messageStyles.containerStyle}>
                {this.renderProfilePicture()}
                {this.renderNameDate()}
                {this.renderMessageBody()}
            </div>;
    }

    render() {
        return this.renderMessage();
    }
}

module.exports = Message;