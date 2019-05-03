// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import * as classes from "./create-chat.css";
import { UserDataContext } from '../App';

interface ICreateChatCanvasProps {
    inputTitle: string;
    inputDescription: string;
    isSubmitButtonDisabled: () => boolean;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>, title: string, description: string) => void;
    handleInputTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleInputDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const CreateChatCanvas = (props: ICreateChatCanvasProps) => {
    const {
        inputTitle,
        inputDescription,
        isSubmitButtonDisabled,
        handleSubmit,
        handleInputTitleChange,
        handleInputDescriptionChange
    } = props;

    let submitButtonClass = classes.SubmitButton + " ";
    submitButtonClass += isSubmitButtonDisabled() ? classes.Green : classes.Gray;
    
    return (
        <div className={classes.Background}>
            <div className={classes.FormContainer}>
                <div className={classes.Pane}>
                    <UserDataContext.Consumer>
                        {(userData) => (
                            <form onSubmit={(e) => handleSubmit(e, inputTitle, inputDescription)} className={classes.Container}>
                                <h1 className={classes.FormTitle}>Create New Chat</h1>
                                <input
                                    className={classes.InputTitle}
                                    type='text'
                                    value={inputTitle}
                                    placeholder="Enter chat title"
                                    onChange={(e) => handleInputTitleChange(e)} />
                                <textarea
                                    className={classes.InputDescription}
                                    value={inputDescription}
                                    placeholder="Enter chat description"
                                    onChange={(e) => handleInputDescriptionChange(e)}></textarea>
                                <button
                                    disabled={!isSubmitButtonDisabled()}
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

export default CreateChatCanvas;