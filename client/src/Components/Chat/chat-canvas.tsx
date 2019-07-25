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
    handleSubmit: (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>, userData: IUserContext) => void;
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

    return (
        <div className={classes.Container}>
            <div className={classes.ChatContainer}>
                <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                    <div className={classes.ChatHeader}>
                        <div className={classes.SideColumn}></div>
                        <h1 className={classes.Title}>{title}</h1>
                        <div className={classes.SideColumn}>
                            <table>
                                <tbody>
                                    <Icon type='replies' count={replies || 0} text='replies' />
                                    <Icon type='views' count={views || 0} text='views' />
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={classes.ChatBody}>
                        {messages.map((message) => {
                            return (
                                <div key={message.id}>
                                    <UserDataContext.Consumer>
                                    {
                                        (userData) => (
                                        <Message
                                            name={message.authorName}
                                            date={message.date}
                                            messageBody={message.messageBody}
                                            isCurrentUser={message.authorName === userData.user.username} />
                                        )
                                    }
                                    </UserDataContext.Consumer>
                                </div>
                            );
                        })}
                        {loading ? (
                            <div className={classes.Loading}>
                                <ReactLoading type="bubbles" color="rgb(13, 103, 151)" height={'5%'} width={'5%'} />
                            </div>
                        ) : null}
                    </div>
                    <div className={classes.Form}>
                        <UserDataContext.Consumer>
                        {
                            (userData) => userData.user && userData.user.username && userData.user.username.length > 0 ? (
                                <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                                    <input
                                        className={classes.InputField}
                                        type='text'
                                        value={messageBody}
                                        placeholder="Enter your messsage here"
                                        onKeyDown={(e) => { if (e.key === "Enter" && messageBody && messageBody.length > 0) handleSubmit(e, userData) }}
                                        onChange={(e) => handleInputChange(e)} />
                                    <button
                                        onClick={(e) => messageBody && messageBody.length > 0 ? handleSubmit(e, userData) : null}
                                        className={classes.SubmitButton}
                                        type='submit'
                                        disabled={!(messageBody && messageBody.length > 0)}>
                                        <input type="image" src={sendIcon} className={classes.SendIcon} />
                                    </button>
                                </div>
                            ) : (
                                <div className={classes.InputField} style={{ color: "#686868", textAlign: "center", flex: 1, cursor: "not-allowed" }}>Please log in to send messages in this chat</div>
                            )
                        }
                        </UserDataContext.Consumer>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ChatCanvas;