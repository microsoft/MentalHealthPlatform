// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import SignUpLoginCanvas from "./signup-login-canvas";
import { BASE_URL } from '../../util/Helpers';
import { IUserContext } from '../App';

export interface ISignupLoginProviderState {
    username: string;
    password: string;
    signUpFirstName: string;
    signUpUsername: string;
    signUpPass1: string;
    signUpPass2: string;
}

class SignupLoginProviderClass extends React.Component<RouteComponentProps<{}>, ISignupLoginProviderState> {
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = {
            username: "",
            password: "",
            signUpFirstName: "",
            signUpUsername: "",
            signUpPass1: "",
            signUpPass2: ""
        };
    }

    isSignUpButtonEnabled = () => {
        return this.state.signUpFirstName.length > 0
        && this.state.signUpUsername.length > 0
        && this.state.signUpPass1.length > 0
        && this.state.signUpPass1 == this.state.signUpPass2;
    }

    isLoginButtonEnabled = () => {
        return this.state.username.length > 0
        && this.state.password.length > 0;
    }

    submitSignup = () => {
        fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.signUpUsername,
                pass: this.state.signUpPass1,
                displayName: this.state.signUpFirstName
            })
        }).then(function(response) {
            return response.json();
        }).then(function(myJson) {
        });
    }

    submitLogin = (userData: IUserContext) => {        
        const username = this.state.username;
        const pass = this.state.password;
        fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                pass: pass,
            })
        }).then(function(response) {
            const output = response.json();
            return output;
        }).then(function(data) {
            if (data && data.statusMessage == 1) {
                console.log("Log in success for user " + username);
                userData.updateUser({
                    userId: 0,
                    username: username
                });
                this.props.history.push("/");
            }
            else {
                console.log("Log in failure")
            }
        });
    }

    updateInputValues = (inputType: string, value: string) => {
        switch (inputType) {
            case "signUpFirstName":
                this.setState({ signUpFirstName: value });
                break;
            case "signUpUsername":
                this.setState({ signUpUsername: value });
                break;
            case "signUpPass1":
                this.setState({ signUpPass1: value });
                break;
            case "signUpPass2":
                this.setState({ signUpPass2: value });
                break;
            case "username":
                this.setState({ username: value });
                break;
            case "password":
                this.setState({ password: value });
                break;
            default:
                break;
        }
    }

    /**
     * Renders sign-up/login form component
     * @return  {React.Component}   Rendered component
     */
    render = () => {
        return (
            <SignUpLoginCanvas
                username={this.state.username}
                password={this.state.password}
                signUpFirstName={this.state.signUpFirstName}
                signUpUsername={this.state.signUpUsername}
                signUpPass1={this.state.signUpPass1}
                signUpPass2={this.state.signUpPass2}
                isSignUpButtonEnabled={this.isSignUpButtonEnabled}
                isLoginButtonEnabled={this.isLoginButtonEnabled}
                submitSignup={this.submitSignup}
                submitLogin={this.submitLogin}
                updateInputValues={this.updateInputValues}
            />
        );
    }
}

export const SignupLogin =  withRouter(SignupLoginProviderClass);