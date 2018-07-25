import React from 'react';
import { withRouter } from 'react-router-dom';
import { chats } from '../util/Dummy';
import Message from './Message';
import sendIcon from './../images/send_icon.png';

import ChatStyles from './ChatStyles';

import { BASE_URL } from './../util/Helpers';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        };
    }

    handleInputChange(e) {
        this.setState({
            input: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        alert('Submitted!');
    }

    render() {
        const { input } = this.state;
        const chat = chats['8xf0y6ziyjabvozdd253nd'];

        const containerStyle = Object.assign({}, ChatStyles.containerStyle, {
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 1)), url(${require('./../images/topic_image_0.jpg')})`
        });

        return (
            <div style={containerStyle}>
                <div style={ChatStyles.chatContainerStyle}>
                    <div>
                        <div style={ChatStyles.chatHeaderStyle}>
                            <h1 style={ChatStyles.title}>{chat.title}</h1>
                        </div>
                        <div style={ChatStyles.chatBodyStyle}>
                            {chat.messages.map((message) => {
                                return (
                                    <div key={message.id}>
                                        <Message
                                            name={message.author}
                                            date={message.timestamp}
                                            messageBody={message.message}
                                            isCurrentUser={message.author == "sarahedo"} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <form onSubmit={this.handleSubmit} style={ChatStyles.formStyle}>
                        <input
                            style={ChatStyles.inputField}
                            type='text'
                            value={this.state.input}
                            placeholder="Enter your messsage here"
                            onChange={(e) => this.handleInputChange(e)} />
                        <button
                            style={ChatStyles.submitButton}
                            type='submit'
                            disabled={input === ''}>
                            <input type="image" src={sendIcon} style={ChatStyles.sendIconStyle} />
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    componentDidMount() {
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
            console.log(data);
        }).catch((error) => {
            console.log(error);
        });
    }
}

export default withRouter(Chat);