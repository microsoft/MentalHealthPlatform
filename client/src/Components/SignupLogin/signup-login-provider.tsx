// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import * as H from 'history';

import SignUpLoginCanvas from "./signup-login-canvas";
import { IUserContext } from '../UserProvider';
import { basePostRequest } from "./../../util/base-requests";

interface ISignupLoginProviderProps {
    history: H.History;
}

const SignupLoginProvider = (props: ISignupLoginProviderProps) => {
    let _userData: IUserContext;

    const { history } = props;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [signUpFirstName, setSignUpFirstName] = useState("");
    const [signUpUsername, setSignUpUsername] = useState("");
    const [signUpPass1, setSignUpPass1] = useState("");
    const [signUpPass2, setSignUpPass2] = useState("");
    const [signupErrorMessage, setSignupErrorMessage] = useState("");
    const [loginErrorMessage, setLoginErrorMessage] = useState("");

    const isSignUpButtonEnabled = () => {
        return signUpFirstName.length > 0
            && signUpUsername.length > 0
            && signUpPass1.length > 0
            && signUpPass1 === signUpPass2;
    }

    const isLoginButtonEnabled = () => {
        return username.length > 0 && password.length > 0;
    }

    const submitSignupResponseHandler = (data: any) => {
        setLoginErrorMessage("");
    }

    const submitSignupErrorHandler = (error: any) => {
        setLoginErrorMessage("Sign up failure");
        console.log(error);
    }

    const submitSignup = () => {
        const postRequestData = {
            username: signUpUsername,
            pass: signUpPass1,
            displayName: signUpFirstName
        };
        basePostRequest("signup", postRequestData, submitSignupResponseHandler, submitSignupErrorHandler);
    }

    const submitLoginResponseHandler = (data: any) => {
        if (data && data.statusMessage == 1) {
            console.log("Log in success for user " + username);
            const userInfo = {
                userId: 0,
                username
            };
            _userData.updateUser(userInfo);
            localStorage.setItem('userId', userInfo.userId.toString());
            localStorage.setItem('username', userInfo.username.toString());
            
            history.push("/");
            setLoginErrorMessage("");
        }
        else {
            setLoginErrorMessage("Log in failure");
            console.log("Log in failure")
        }
    }

    const submitLoginErrorHandler = (error: any) => {
        console.log(error);
    }
    
    const submitLogin = (userData: IUserContext) => {
        _userData = userData;
        const postRequestData = {
            username: username,
            pass: password
        };
        basePostRequest("login", postRequestData, submitLoginResponseHandler, submitLoginErrorHandler);
    }

    const updateInputValues = (inputType: string, value: string) => {
        switch (inputType) {
            case "signUpFirstName":
                setSignUpFirstName(value);
                break;
            case "signUpUsername":
                setSignUpUsername(value);
                break;
            case "signUpPass1":
                setSignUpPass1(value);
                break;
            case "signUpPass2":
                setSignUpPass2(value);
                break;
            case "username":
                setUsername(value);
                break;
            case "password":
                setPassword(value);
                break;
            default:
                break;
        }
    }

    return (
        <SignUpLoginCanvas
            username={username}
            password={password}
            signUpFirstName={signUpFirstName}
            signUpUsername={signUpUsername}
            signUpPass1={signUpPass1}
            signUpPass2={signUpPass2}
            isSignUpButtonEnabled={isSignUpButtonEnabled}
            isLoginButtonEnabled={isLoginButtonEnabled}
            submitSignup={submitSignup}
            submitLogin={submitLogin}
            updateInputValues={updateInputValues}
            signupErrorMessage={signupErrorMessage}
            loginErrorMessage={loginErrorMessage}
        />
    );
}

export const SignupLogin = withRouter(SignupLoginProvider);