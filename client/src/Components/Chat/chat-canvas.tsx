// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import ReactLoading from 'react-loading';

import * as classes from "./chat.css";
import { MessageType } from "./chat-provider";

import { IUserContext, UserDataContext } from '../App';
import Message from '../Messages/Message';
import sendIcon from '../../images/send_icon.png';
import Icon from '../Icon/Icon';

interface IChatCanvasProps {
    title: string;
    messages: MessageType[];
    messageBody: string;
    views: number;
    replies: number;
    loading: boolean;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.MouseEvent<HTMLButtonElement>, userData: IUserContext) => void;
}

const ChatCanvas = (props: IChatCanvasProps) => {
    const {
        title,
        messages,
        messageBody,
        views,
        replies,
        loading,
        handleInputChange,
        handleSubmit
    } = props;

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
                            <Icon type='replies' count={replies || 0} text='replies' />
                            <Icon type='views' count={views || 0} text='views' />
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
                        value={messageBody}
                        placeholder="Enter your messsage here"
                        onChange={(e) => handleInputChange(e)} />
                        <UserDataContext.Consumer>
                            {
                                (userData) => (<button
                                    onClick={(e) => handleSubmit(e, userData)}
                                    className={classes.SubmitButton}
                                    type='submit'
                                    disabled={messageBody === ''}>
                                    <input type="image" src={sendIcon} className={classes.SendIcon} />
                                </button>)
                            }
                        </UserDataContext.Consumer>
                </form>
            </div>
        </div >
    );
};

export default ChatCanvas;