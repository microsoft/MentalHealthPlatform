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
    
    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        handleSubmit(event, inputTitle, inputDescription);
    };

    return (
        <div className={classes.Container}>
            <div className={classes.FormContainer}>
                <div className={classes.Pane}>
                    <form onSubmit={onSubmitHandler} className={classes.FormWrapper}>
                        <h1 className={classes.FormTitle}>Create New Chat</h1>
                        <input
                            className={classes.InputTitle}
                            type='text'
                            value={inputTitle}
                            placeholder="Enter chat title"
                            onChange={handleInputTitleChange} />
                        <textarea
                            className={classes.InputDescription}
                            value={inputDescription}
                            placeholder="Enter chat description"
                            onChange={handleInputDescriptionChange}></textarea>
                        <button
                            disabled={!isSubmitButtonDisabled()}
                            className={submitButtonClass}
                            type='submit'>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default CreateChatCanvas;