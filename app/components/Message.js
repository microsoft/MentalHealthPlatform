import React from 'react';

import { formatDate } from '../util/Helpers';
import messageStyles  from './MessageStyles';

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
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Smiley_1741_Hennet.jpg" style={profilePictureStyle}/>
        );
    };

    renderMessageBody() {
        var messageBodyContainerStyle = Object.assign({}, messageStyles.messageBodyContainerStyle, {
            backgroundColor: this.props.isCurrentUser ? "#CCCCCC" :"#CEFFCE", 
        });

        return (
            <div style={messageBodyContainerStyle}>
                <h3>{this.props.messageBody}</h3>
            </div>
        );
    };

    renderNameDate() {
        return (
            <div style={messageStyles.nameDateContainerStyle}>
                <h3>{this.props.name}</h3>
                <h3>{formatDate(this.props.date)}</h3>
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
            <div>
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