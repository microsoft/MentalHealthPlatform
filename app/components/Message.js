import React from 'react';

import { formatDate } from '../util/Helpers';

class Message extends React.Component {


    constructor(props) {
        super(props);
        this.state = {

        };
    }

    renderMessage(){
        var containerStyle = {
            display: "flex", 
            marginBottom: "10px"
        };
        var profilePictureStyle = {
            width: "100px", 
            height: "100px", 
            borderRadius: "50%", 
            marginLeft: this.props.isCurrentUser ? "10px" : "0px"

        };
        var nameDateContainerStyle = {
            marginLeft: "10px"
        };
        var messageBodyContainerStyle = {
            display: "flex", 
            flex: 1, 
            marginLeft: "10px",
            border: "1px solid #006600",
            paddingLeft: "10px",
            paddingRight: "10px",
            backgroundColor: this.props.isCurrentUser ? "#CCCCCC" :"#CEFFCE", 
            borderRadius: "10px",
            fontFamily: "OpenSans"
        };


        const { name, date, messageBody } = this.props;

        return this.props.isCurrentUser ? (
            <div style={containerStyle}>
                <div style={messageBodyContainerStyle}>
                    <h3>{messageBody}</h3>
                </div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Smiley_1741_Hennet.jpg" style={profilePictureStyle}/>
                <div style={nameDateContainerStyle}>
                    <h3>{name}</h3>
                    <h3>{formatDate(date)}</h3>
                </div>
                
            </div>
        ) : 
        (
            <div style={containerStyle}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Smiley_1741_Hennet.jpg" style={profilePictureStyle}/>
                <div style={nameDateContainerStyle}>
                    <h3>{name}</h3>
                    <h3>{formatDate(date)}</h3>
                </div>
                <div style={messageBodyContainerStyle}>
                    <h3>{messageBody}</h3>
                </div>
            </div>
        );
    }

    render() {
        return this.renderMessage();
    }
}

module.exports = Message;