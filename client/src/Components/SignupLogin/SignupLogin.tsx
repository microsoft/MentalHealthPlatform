// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import * as classes from "./SignupLogin.css";

import { BASE_URL } from '../../util/Helpers';
import { IUserContext, UserDataContext } from '../App';

export interface ISignupLoginState {
    username: string;
    password: string;
    signUpFirstName: string;
    signUpUsername: string;
    signUpPass1: string;
    signUpPass2: string;
}

class SignupLoginClass extends React.Component<RouteComponentProps<{}>, ISignupLoginState> {
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

    /**
     * Renders sign up panel in overall sign-up/login form
     * @return  {React.Component}   Rendered component
     */
    createSignupPane = () => {
        let signupButtonClasses = classes.FormButton + " ";
        signupButtonClasses += this.isSignUpButtonEnabled() ? classes.Green : classes.Gray;
        const _this = this;

        return (
            <div className={classes.Pane}>
                <h1 className={classes.FormTitle}>Sign Up</h1>
                <div>
                    <input type="text" value={this.state.signUpFirstName} placeholder="First Name" name="name" required className={classes.FormTextInput} onChange={(e) => this.setState({signUpFirstName: e.target.value})} />
                    <input type="text" value={this.state.signUpUsername} placeholder="Username" name="username" required className={classes.FormTextInput} onChange={(e) => this.setState({signUpUsername: e.target.value})} />
                    <input type="password" value={this.state.signUpPass1} placeholder="Password" name="password" required className={classes.FormTextInput} onChange={(e) => this.setState({signUpPass1: e.target.value})} />
                    <input type="password" value={this.state.signUpPass2} placeholder="Confirm Password" name="confirm-password" required className={classes.FormTextInput} onChange={(e) => this.setState({signUpPass2: e.target.value})} />
                    <button type="submit" onClick={(e) => this.submitSignup()} className={signupButtonClasses} disabled={!this.isSignUpButtonEnabled()}>Sign Up</button>
                </div>
            </div>
        )
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
    
    /**
     * Renders login panel in overall sign-up/login form
     * @return  {React.Component}   Rendered component
     */
    createLoginPane = (userData: IUserContext) => {
        let loginButtonClasses = classes.FormButton + " ";
        loginButtonClasses += this.isLoginButtonEnabled() ? classes.Green : classes.Gray;

        return (
            <div className={classes.Pane} style={{borderLeft: "1px solid #CCCCCC"}}>
                <h1 className={classes.FormTitle}>Log In</h1>
                <div>
                    <input type="text" value={this.state.username} placeholder="Username" name="username" required className={classes.FormTextInput} onChange={(e) => this.setState({username: e.target.value})} />
                    <input type="password" value={this.state.password} placeholder="Password" name="password" required className={classes.FormTextInput} onChange={(e) => this.setState({password: e.target.value})} />
                    <button onClick={(e) => this.submitLogin(userData)} disabled={!this.isLoginButtonEnabled} type="submit" className={loginButtonClasses}>Login</button>
                </div>
            </div>
        )
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

    /**
     * Renders form that includes sign up and login panels
     * @return  {React.Component}   Rendered component
     */
    createSignupLoginForm = () => {
        return (
            <div className={classes.Background}>
                <div className={classes.SignupLoginForm}>
                    {this.createSignupPane()}
                    <UserDataContext.Consumer>
                        {(userData) => {return this.createLoginPane(userData)}}
                    </UserDataContext.Consumer>
                    
                </div>
            </div>
        );
    }

    /**
     * Renders sign-up/login form component
     * @return  {React.Component}   Rendered component
     */
    render = () => {
        return (
            this.createSignupLoginForm()
        );
    }
}

export const SignupLogin =  withRouter(SignupLoginClass);