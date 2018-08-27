import React from 'react';
import { withRouter } from 'react-router-dom';
import ReactLoading from 'react-loading';
import Message from '../Messages/Message';
import sendIcon from '../../images/send_icon.png';

import ChatStyles from './ChatStyles';

import { BASE_URL } from '../../util/Helpers';
import Icon from '../Icon/Icon';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            mesages: [],
            messageBody: '',
            views: 0,
            replies: 0,
            loading: true
        };
    }

    handleInputChange(e) {
        this.setState({
            messageBody: e.target.value
        })
    }

    handleSubmit = (e) => {
        const { messageBody, messages } = this.state;
        const { chatID } = this.props.match.params;

        e.preventDefault();
        this.setState({
            messageBody: '',
            loading: true
        });

        fetch(`${BASE_URL}/sendmessage`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chatId: chatID,
                messageBody: messageBody,
                username: "Aldo"
            })
        }).then((response) => {
            const output = response.json();
            return output;
        }).then((data) => {
            if (data && data.statusMessage == 1) {
                console.log("Message sent");
            }
            else {
                alert("Message failed to send")
            }

            this.retrieveChatData();
        });
    }

    render() {
        const { messageBody, messages, title, loading } = this.state;

        const containerStyle = Object.assign({}, ChatStyles.containerStyle, {
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 1)), url(${require('../../images/topic_image_0.jpg')})`
        });

        const _this = this;

        if (loading) {
            return (
                <div style={{
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: "center",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    position: "absolute",
                    margin: "auto"
                }}>
                    <ReactLoading type="bubbles" color="#333" height={'5%'} width={'5%'} />
                </div>
            )
        }

        return (
            <div style={containerStyle}>
                <div style={ChatStyles.chatContainerStyle}>
                    <div>
                        <div style={ChatStyles.chatHeaderStyle}>
                            <div style={ChatStyles.sideColumn}></div>
                            <h1 style={ChatStyles.title}>{title}</h1>
                            <div style={ChatStyles.sideColumn}>
                                <Icon type='replies' number={this.state.replies || '0'} text='replies' />
                                <Icon type='views' number={this.state.views || '0'} text='views' />
                            </div>
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
                    <form style={ChatStyles.formStyle}>
                        <input
                            style={ChatStyles.inputField}
                            type='text'
                            value={this.state.messageBody}
                            placeholder="Enter your messsage here"
                            onChange={(e) => this.handleInputChange(e)} />
                        <button
                            onClick={(e) => this.handleSubmit(e, _this)}
                            style={ChatStyles.submitButton}
                            type='submit'
                            disabled={messageBody === ''}>
                            <input type="image" src={sendIcon} style={ChatStyles.sendIconStyle} />
                        </button>
                    </form>
                </div>
            </div >
        );
    }

    retrieveChatData() {
        const { chatID } = this.props.match.params;

        fetch(`${BASE_URL}/getChat?chatId=${chatID}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            const output = response.json();
            return output;
        }).then((data) => {
            const messages = data.messages !== undefined ? data.messages : [];
            this.setState({
                title: data.chatTitle,
                messages,
                loading: false,
                replies: data.numberOfReplies,
                views: data.numberOfViews,
                loading: false
            })
            console.log("Data", data);
        }).catch((error) => {
            console.log(error);
        });
    }

    componentDidMount() {
        this.retrieveChatData();
    }
}

export default withRouter(Chat);