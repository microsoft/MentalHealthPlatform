import React from 'react';
import { withRouter } from 'react-router-dom';
import { chats } from '../util/Dummy';
import Message from './Message';
import sendIcon from './../images/send_icon.png';

import ChatStyles from './ChatStyles';

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
        return (
            <div style={ChatStyles.containerStyle}>
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
                                            isCurrentUser={true} />
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
}

export default withRouter(Chat);