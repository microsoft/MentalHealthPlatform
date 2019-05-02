// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { BASE_URL } from '../../util/Helpers';
import * as classes from "./CreateChat.css";
import { IUserContext, UserDataContext } from '../App';

interface ICreateChatProps {
    UserContext: React.Context<IUserContext>;
    chatID?: string;
}

export interface ICreateChatState {
    inputTitle: string;
    inputDescription: string;
}

class CreateChatClass extends React.Component<RouteComponentProps<{}> & ICreateChatProps, ICreateChatState> {
    constructor(props: RouteComponentProps<{}> & ICreateChatProps) {
        super(props);
        this.state = {
            inputTitle: "",
            inputDescription: ""
        };
    }

    getTopicId = () => {
        let subUrl = this.props.match.url.replace("createChat/", "").replace("createChat", "");        
        
        let list = subUrl.split("/");
        list = list.filter((item) => item != "");

        const topicId = list[list.length - 1].replace("topic", "");
        
        return topicId;
    }

    handleInputTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            inputTitle: e.target.value
        })
    }

    handleInputDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            inputDescription: e.target.value
        })
    }

    isSubmitButtonDisabled = () => {
        return this.state.inputTitle.length > 0 && this.state.inputDescription.length > 0;
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>, title: string, description: string) => {
        e.preventDefault();
        fetch(`${BASE_URL}/createchat`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chatTitle: title,
                chatDescription: description,
                topicId: this.getTopicId(),
                username: "Aldo"
            })
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log("chat created", data);
            if (data && data.chatId !== undefined) {
                const path = `${this.props.match.url.replace("createChat/", "").replace("createChat", "")}chat/${data.chatId}`;
                this.props.history.push(path);
            }
        });
    }

    renderForm = () => {
        let submitButtonClass = classes.SubmitButton + " ";
        submitButtonClass += this.isSubmitButtonDisabled() ? classes.Green : classes.Gray;

        const _this = this;
        
        return (
            <div className={classes.Background}>
                <div className={classes.FormContainer}>
                    <div className={classes.Pane}>
                        <UserDataContext.Consumer>
                            {(userData) => (
                                <form onSubmit={(e) => this.handleSubmit(e, _this.state.inputTitle, _this.state.inputDescription)} className={classes.Container}>
                                    <h1 className={classes.FormTitle}>Create New Chat</h1>
                                    <input
                                        className={classes.InputTitle}
                                        type='text'
                                        value={this.state.inputTitle}
                                        placeholder="Enter chat title"
                                        onChange={(e) => this.handleInputTitleChange(e)} />
                                    <textarea
                                        className={classes.InputDescription}
                                        value={this.state.inputDescription}
                                        placeholder="Enter chat description"
                                        onChange={(e) => this.handleInputDescriptionChange(e)}></textarea>
                                    <button
                                        disabled={!this.isSubmitButtonDisabled()}
                                        className={submitButtonClass}
                                        type='submit'>
                                        Submit
                                    </button>
                                </form>
                            )}
                        </UserDataContext.Consumer>
                    </div>
                </div>
            </div>
        )
    };
    
    render = () => {
        return this.renderForm();
    }
}

export const CreateChat = withRouter(CreateChatClass);