// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import * as classes from "./signup-login.css";
import { IUserContext, UserDataContext } from '../App';

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

/**
 * Renders sign up panel in overall sign-up/login form
 * @return  {React.Component}   Rendered component
 */
const createSignupPane = (signUpFirstName: string, signUpUsername: string, signUpPass1: string, signUpPass2: string, isSignUpButtonEnabled: () => boolean, submitSignup: () => void, updateInputValues: (inputType: string, value: string) => void, signupErrorMessage: string) => {
    let signupButtonClasses = classes.FormButton + " ";
    signupButtonClasses += isSignUpButtonEnabled() ? classes.Green : classes.Gray;

    return (
        <div className={classes.Pane}>
            <h1 className={classes.FormTitle}>Sign Up</h1>
            <div>
                <input
                    type="text"
                    value={signUpFirstName}
                    placeholder="First Name"
                    name="name"
                    required
                    className={classes.FormTextInput}
                    onChange={(e) => updateInputValues("signUpFirstName", e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && isSignUpButtonEnabled()) submitSignup() }}
                />
                <input
                    type="text"
                    value={signUpUsername}
                    placeholder="Username"
                    name="username"
                    required
                    className={classes.FormTextInput}
                    onChange={(e) => updateInputValues("signUpUsername", e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && isSignUpButtonEnabled()) submitSignup() }}
                />
                <input
                    type="password"
                    value={signUpPass1}
                    placeholder="Password"
                    name="password"
                    required
                    className={classes.FormTextInput}
                    onChange={(e) => updateInputValues("signUpPass1", e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && isSignUpButtonEnabled()) submitSignup() }}
                />
                <input
                    type="password" 
                    value={signUpPass2}
                    placeholder="Confirm Password"
                    name="confirm-password"
                    required
                    className={classes.FormTextInput}
                    onChange={(e) => updateInputValues("signUpPass2", e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && isSignUpButtonEnabled()) submitSignup() }}
                />
                <div className={classes.InvalidMessage}>{signupErrorMessage}</div>
                <button type="submit" onClick={(e) => submitSignup()} className={signupButtonClasses} disabled={!isSignUpButtonEnabled()}>Sign Up</button>
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

    return (
        <div className={classes.Pane} style={{ borderLeft: "1px solid #CCCCCC" }}>
            <h1 className={classes.FormTitle}>Log In</h1>
            <div>
                <input
                    type="text"
                    value={username}
                    placeholder="Username"
                    name="username"
                    required
                    className={classes.FormTextInput}
                    onChange={(e) => updateInputValues("username", e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && isLoginButtonEnabled()) submitLogin(userData) }}
                />
                <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    name="password"
                    required
                    className={classes.FormTextInput}
                    onChange={(e) => updateInputValues("password", e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && isLoginButtonEnabled()) submitLogin(userData) }}
                />
                <div className={classes.InvalidMessage}>{loginErrorMessage}</div>
                <button onClick={(e) => submitLogin(userData)} disabled={!isLoginButtonEnabled()} type="submit" className={loginButtonClasses}>Login</button>
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
        <div className={classes.Background}>
            <div className={classes.SignupLoginForm}>
                {createSignupPane(signUpFirstName, signUpUsername, signUpPass1, signUpPass2, isSignUpButtonEnabled, submitSignup, updateInputValues, signupErrorMessage)}
                <UserDataContext.Consumer>
                    {(userData) => {return createLoginPane(userData, username, password, isLoginButtonEnabled, submitLogin, updateInputValues, loginErrorMessage)}}
                </UserDataContext.Consumer>
            </div>
        </div>
    );
};

export default SignUpLoginCanvas;