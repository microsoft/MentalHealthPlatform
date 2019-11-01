// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import * as classes from "./chat.css";
import { MessageType } from "./chat-provider";
import { IUserContext, UserDataContext } from '../UserProvider';
import Message from '../Messages/Message';
import sendIcon from '../../images/send_icon.png';
import Icon from '../Icon/Icon';
import { LocalizationContext } from './../LocalizationProvider';
import LoadingBubbles from './../LoadingBubbles/loading-bubbles';

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

    const { getLocalizedString } = React.useContext(LocalizationContext);

    const renderForm = (userData: IUserContext) => {
        const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter" && messageBody && messageBody.length > 0) {
                handleSubmit(e, userData);
            }
        }

        const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
            if (messageBody && messageBody.length > 0) {
                handleSubmit(event, userData);
            }
        }

        return (
            <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <input
                    className={classes.InputField}
                    type='text'
                    value={messageBody}
                    placeholder={getLocalizedString("CHAT_INPUT_PLACEHOLDER")}
                    onKeyDown={onKeyDownHandler}
                    onChange={handleInputChange} />
                <button
                    onClick={onClickHandler}
                    className={classes.SubmitButton}
                    type='submit'
                    disabled={!(messageBody && messageBody.length > 0)}>
                    <input type="image" src={sendIcon} className={classes.SendIcon} />
                </button>
            </div>
        );
    }    

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
                                    <Icon type='replies' count={replies ? replies : 0} text={getLocalizedString("CHAT_INFO_REPLIES")} />
                                    <Icon type='views' count={views ? views : 0} text={getLocalizedString("CHAT_INFO_VIEWS")} />
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={classes.ChatBody}>
                        {messages.map((message) => (
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
                        ))}
                        <LoadingBubbles isLoading={loading}/>
                    </div>
                    <div className={classes.Form}>
                        <UserDataContext.Consumer>
                        {
                            (userData) => userData.user && userData.user.username && userData.user.username.length > 0 ?
                                renderForm(userData)
                                : <div className={classes.InputField} style={{ color: "#686868", textAlign: "center", flex: 1, cursor: "not-allowed" }}>{getLocalizedString("CHAT_LOGIN_MESSAGE")}</div>
                        }
                        </UserDataContext.Consumer>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ChatCanvas;