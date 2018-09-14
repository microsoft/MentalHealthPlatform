import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { Message } from '../Messages/Message';
import sendIcon from '../../images/send_icon.png';

import * as classes from "./Chat.css";

import { BASE_URL } from '../../util/Helpers';
import {Icon} from '../Icon/Icon';

export type MessageType = {
    id: string;
    authorName: string;
    date: string;
    messageBody: string;
}

export interface IChatState {
    title: string;
    messages: MessageType[];
    messageBody: string;
    views: number;
    replies: number;
    loading: boolean;
}

class ChatClass extends React.Component<RouteComponentProps<{chatID: string}>, IChatState> {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            messages: [],
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
        const { messageBody } = this.state;
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
        const _this = this;

        if (loading) {
            return (
                <div className={classes.Loading}>
                    <ReactLoading type="bubbles" color="#333" height={'5%'} width={'5%'} />
                </div>
            )
        }

        return (
            <div className={classes.Container}>
                <div className={classes.ChatContainer}>
                    <div>
                        <div className={classes.ChatHeader}>
                            <div className={classes.SideColumn}></div>
                            <h1 className={classes.Title}>{title}</h1>
                            <div className={classes.SideColumn}>
                                <Icon type='replies' count={this.state.replies || 0} text='replies' />
                                <Icon type='views' count={this.state.views || 0} text='views' />
                            </div>
                        </div>
                        <div className={classes.ChatBody}>
                            {messages.map((message) => {
                                return (
                                    <div key={message.id}>
                                        <Message
                                            name={message.authorName}
                                            date={message.date}
                                            messageBody={message.messageBody}
                                            isCurrentUser={message.authorName == "sarahedo"} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <form className={classes.Form}>
                        <input
                            className={classes.InputField}
                            type='text'
                            value={this.state.messageBody}
                            placeholder="Enter your messsage here"
                            onChange={(e) => this.handleInputChange(e)} />
                        <button
                            onClick={(e) => this.handleSubmit(e)}
                            className={classes.SubmitButton}
                            type='submit'
                            disabled={messageBody === ''}>
                            <input type="image" src={sendIcon} className={classes.SendIcon} />
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
                views: data.numberOfViews
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

export const Chat = withRouter(ChatClass);