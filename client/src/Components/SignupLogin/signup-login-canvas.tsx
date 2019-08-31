// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import * as classes from "./signup-login.css";
import { IUserContext, UserDataContext } from '../UserProvider';

interface IHandlers {
    isEnabled: () => boolean,
    submit: (userData?: IUserContext) => void;
    updateInput: (inputType: string, value: string) => void;
}

export interface ISignupLoginCanvasProps {
    username: string;
    password: string;
    signUpFirstName: string;
    signUpUsername: string;
    signUpPass1: string;
    signUpPass2: string;
    isSignUpButtonEnabled: () => boolean;
    isLoginButtonEnabled: () => boolean;
    submitSignup: () => void;
    submitLogin: (userData: IUserContext) => void;
    updateInputValues: (inputType: string, value: string) => void;
    signupErrorMessage: string;
    loginErrorMessage: string;
}

const renderInput = (type: string, value: string, placeholder: string, name: string, inputValueParam: string, handlers: IHandlers, userData?: IUserContext) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => handlers.updateInput(inputValueParam, e.target.value);
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === "Enter" && handlers.isEnabled()) handlers.submit(userData) };
    
    return (
        <input
            type={type}
            value={value}
            placeholder={placeholder}
            name={name}
            required
            className={classes.FormTextInput}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    );
};

/**
 * Renders sign up panel in overall sign-up/login form
 * @return  {React.Component}   Rendered component
 */
const createSignupPane = (signUpFirstName: string, signUpUsername: string, signUpPass1: string, signUpPass2: string, isSignUpButtonEnabled: () => boolean, submitSignup: () => void, updateInputValues: (inputType: string, value: string) => void, signupErrorMessage: string) => {
    let signupButtonClasses = classes.FormButton + " ";
    signupButtonClasses += isSignUpButtonEnabled() ? classes.Green : classes.Gray;

    const handlers = {
        isEnabled: isSignUpButtonEnabled,
        submit: submitSignup,
        updateInput: updateInputValues
    };

    return (
        <div className={classes.Pane}>
            <h1 className={classes.FormTitle}>Sign Up</h1>
            <div>
                {renderInput("text", signUpFirstName, "First Name", "name", "signUpFirstName", handlers)}
                {renderInput("text", signUpUsername, "Username", "username", "signUpUsername", handlers)}
                {renderInput("password", signUpPass1, "Password", "password", "signUpPass1", handlers)}
                {renderInput("password", signUpPass2, "Confirm Password", "confirm-password", "signUpPass2", handlers)}
                <div className={classes.InvalidMessage}>{signupErrorMessage}</div>
                <button type="submit" onClick={submitSignup} className={signupButtonClasses} disabled={!isSignUpButtonEnabled()}>Sign Up</button>
            </div>
        </div>
    )
}
    
/**
 * Renders login panel in overall sign-up/login form
 * @return  {React.Component}   Rendered component
 */
const createLoginPane = (userData: IUserContext, username: string, password: string, isLoginButtonEnabled: () => boolean, submitLogin: (userData: IUserContext) => void, updateInputValues: (inputType: string, value: string) => void, loginErrorMessage: string) => {
    let loginButtonClasses = classes.FormButton + " ";
    loginButtonClasses += isLoginButtonEnabled() ? classes.Green : classes.Gray;

    const handlers = {
        isEnabled: isLoginButtonEnabled,
        submit: submitLogin,
        updateInput: updateInputValues
    };

    const onClickHandler = () => {
        submitLogin(userData)
    };

    return (
        <div className={classes.Pane} style={{ borderLeft: "1px solid #CCCCCC" }}>
            <h1 className={classes.FormTitle}>Log In</h1>
            <div>
                {renderInput("text", username, "Username", "username", "username", handlers, userData)}
                {renderInput("password", password, "Password", "password", "password", handlers, userData)}
                <div className={classes.InvalidMessage}>{loginErrorMessage}</div>
                <button onClick={onClickHandler} disabled={!isLoginButtonEnabled()} type="submit" className={loginButtonClasses}>Login</button>
            </div>
        </div>
    )
}

/**
 * Renders form that includes sign up and login panels
 * @return  {React.Component}   Rendered component
 */
const SignUpLoginCanvas = (props: ISignupLoginCanvasProps) => {
    const {
        username,
        password,
        signUpFirstName,
        signUpUsername,
        signUpPass1,
        signUpPass2,
        isSignUpButtonEnabled,
        isLoginButtonEnabled,
        submitSignup,
        submitLogin,
        updateInputValues,
        signupErrorMessage,
        loginErrorMessage
    } = props;
    
    return (
        <div className={classes.Container}>
            <div className={classes.SignupLoginForm}>
                {createSignupPane(signUpFirstName, signUpUsername, signUpPass1, signUpPass2, isSignUpButtonEnabled, submitSignup, updateInputValues, signupErrorMessage)}
                <UserDataContext.Consumer>
                    {(userData) => createLoginPane(userData, username, password, isLoginButtonEnabled, submitLogin, updateInputValues, loginErrorMessage)}
                </UserDataContext.Consumer>
            </div>
        </div>
    );
};

export default SignUpLoginCanvas;