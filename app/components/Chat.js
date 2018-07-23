import React from 'react';
import { withRouter } from 'react-router-dom';
import { chats } from '../util/Dummy';
import Message from './Message';

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

    render() {
        const { input } = this.state;

        return (
            <div style={ChatStyles.containerStyle}>
                <div>
                    {chats['8xf0y6ziyjabvozdd253nd'].messages.map((message) => {
                        return (
                            <div key={message.id}>
                                <Message
                                    name={message.author}
                                    date={message.timestamp}
                                    messageBody={message.message} />
                            </div>
                        );
                    })}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        style={ChatStyles.inputField}
                        type='text'
                        value={this.state.input}
                        onChange={(e) => this.handleInputChange(e)} />
                    <button
                        style={ChatStyles.submitButton}
                        type='submit'
                        disabled={input === ''}>
                        Submit
                    </button>
                </form>
                Input: {this.state.input}
            </div>
        );
    }
}

export default withRouter(Chat);