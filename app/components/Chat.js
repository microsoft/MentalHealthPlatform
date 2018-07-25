import React from 'react';
import { withRouter } from 'react-router-dom';
import Message from './Message';
import sendIcon from './../images/send_icon.png';

import ChatStyles from './ChatStyles';

import { BASE_URL } from './../util/Helpers';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            mesages: [],
            messageBody: ''
        };
    }

    handleInputChange(e) {
        this.setState({
            messageBody: e.target.value
        })
    }

    handleSubmit(e, ctx) {
        e.preventDefault();

        fetch(`${BASE_URL}/sendmessage`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chatId: 0,
                messageBody: ctx.state.messageBody,
                username: "sarahedo"
            })
        }).then(function(response) {
            const output = response.json();
            return output;
        }).then(function(data) {
            console.log(data);
            if (data && data.statusMessage == 1) {
                console.log("Message sent");
            }
            else {
                console.log("Message failed to send")
            }
        });
    }

    render() {
        const { messageBody, messages, title } = this.state;

        const containerStyle = Object.assign({}, ChatStyles.containerStyle, {
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 1)), url(${require('./../images/topic_image_0.jpg')})`
        });

        const _this = this;

        if (messages === undefined) {
            return (<div>Loading</div>)
        }

        return (
            <div style={containerStyle}>
                <div style={ChatStyles.chatContainerStyle}>
                    <div>
                        <div style={ChatStyles.chatHeaderStyle}>
                            <h1 style={ChatStyles.title}>{title}</h1>
                        </div>
                        <div style={ChatStyles.chatBodyStyle}>
                            {messages.map((message) => {
                                return (
                                    <div key={message.id}>
                                        <Message
                                            name={message.authorName}
                                            date={message.date}
                                            messageBody={message.messageBody}
                                            isCurrentUser={message.author == "sarahedo"} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <form onSubmit={(e) => this.handleSubmit(e, _this)} style={ChatStyles.formStyle}>
                        <input
                            style={ChatStyles.inputField}
                            type='text'
                            value={this.state.messageBody}
                            placeholder="Enter your messsage here"
                            onChange={(e) => this.handleInputChange(e)} />
                        <button
                            style={ChatStyles.submitButton}
                            type='submit'
                            disabled={messageBody === ''}>
                            <input type="image" src={sendIcon} style={ChatStyles.sendIconStyle} />
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    componentDidMount() {
        const _this = this;

        fetch(`${BASE_URL}/getChat?chatId=${1}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(function(response) {
            const output = response.json();
            return output;
        }).then(function(data) {
            _this.setState({
                title: data.chatTitle,
                messages: data.messages
            })
            console.log(data);
        }).catch((error) => {
            console.log(error);
        });
    }
}

export default withRouter(Chat);