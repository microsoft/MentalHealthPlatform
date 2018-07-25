import React from 'react';

import SignupLoginStyles from './SignupLoginStyles';

const BASE_URL = `http://127.0.0.1:3000`

class SignupLogin extends React.Component {

    constructor(props) {
        super(props);
        const _this = this;
        this.state = {
            username: "",
            password: "",
            signUpFirstName: "",
            signUpUserName: "",
            signUpPass1: "",
            signUpPass2: ""
        };
    }

    /**
     * Renders sign up panel in overall sign-up/login form
     * @return  {React.Component}   Rendered component
     */
    createSignupPane() {
        const agreementTextStyle = Object.assign({}, SignupLoginStyles.signupLoginFormTextStyle, {
            float: "left",
            marginLeft: "3px"
        });

        const signUpButtonStyle = Object.assign({}, SignupLoginStyles.formButtonStyle, {
            backgroundColor: this.isSignUpButtonEnabled() ? "#4CAF50" : "#CCCCCC"
        });

        const _this = this;

        return (
            <div style={SignupLoginStyles.paneStyle}>
                {/* <form> */}
                    <h1 style={SignupLoginStyles.formTitleStyle}>Sign Up</h1>
                    <div>
                        <input type="text" value={this.state.signUpFirstName} placeholder="First Name" name="name" required style={SignupLoginStyles.formTextInputStyle} onChange={(e) => this.setState({signUpFirstName: e.target.value})} />
                        <input type="text" value={this.state.signUpUserName} placeholder="Username" name="username" required style={SignupLoginStyles.formTextInputStyle} onChange={(e) => this.setState({signUpUserName: e.target.value})} />
                        <input type="password" value={this.state.signUpPass1} placeholder="Password" name="password" required style={SignupLoginStyles.formTextInputStyle} onChange={(e) => this.setState({signUpPass1: e.target.value})} />
                        <input type="password" value={this.state.signUpPass2} placeholder="Confirm Password" name="confirm-password" required style={SignupLoginStyles.formTextInputStyle} onChange={(e) => this.setState({signUpPass2: e.target.value})} />
                        <button type="submit" onClick={(e) => this.submitSignup(_this)} style={signUpButtonStyle} disabled={!this.isSignUpButtonEnabled()}>Sign Up</button>
                    </div>
                    <div style={SignupLoginStyles.agreementContainerStyle}>
                        <input type="checkbox" name="agree" style={SignupLoginStyles.agreementCheckboxStyle} />
                        <span style={agreementTextStyle}>By creating an account you agree to our <a href="#" style={SignupLoginStyles.formLinkStyle}>Terms & Privacy</a>.</span>
                    </div>                
                {/* </form> */}
            </div>
        )
    }

    isSignUpButtonEnabled() {
        return this.state.signUpFirstName.length > 0
        && this.state.signUpUserName.length > 0
        && this.state.signUpPass1.length > 0
        && this.state.signUpPass1 == this.state.signUpPass2;
    }

    isLoginButtonEnabled() {
        return this.state.username.length > 0
        && this.state.password.length > 0;
    }
    
    /**
     * Renders login panel in overall sign-up/login form
     * @return  {React.Component}   Rendered component
     */
    createLoginPane() {
        const loginPaneStyle = Object.assign({}, SignupLoginStyles.paneStyle, {
            borderLeft: "1px solid #CCCCCC"
        });

        const loginButtonStyle = Object.assign({}, SignupLoginStyles.formButtonStyle, {
            backgroundColor: this.isLoginButtonEnabled() ? "#4CAF50" : "#CCCCCC"
        });

        const _this = this;
        return (
            <div style={loginPaneStyle}>
                {/* <form> */}
                    <h1 style={SignupLoginStyles.formTitleStyle}>Log In</h1>
                    <div>
                        <input type="text" value={this.state.username} placeholder="Username" name="username" required style={SignupLoginStyles.formTextInputStyle} onChange={(e) => this.setState({username: e.target.value})} />
                        <input type="password" value={this.state.password} placeholder="Password" name="password" required style={SignupLoginStyles.formTextInputStyle} onChange={(e) => this.setState({password: e.target.value})} />
                        <button onClick={(e) => this.submitLogin(_this)} disabled={!this.isLoginButtonEnabled} type="submit" style={loginButtonStyle}>Login</button>
                    </div>
                    <div style={SignupLoginStyles.forgotPasswordContainerStyle}>
                        <span style={SignupLoginStyles.signupLoginFormTextStyle}><a href="#" style={SignupLoginStyles.formLinkStyle}>Forgot your password?</a></span>
                    </div>                
                {/* </form> */}
            </div>
        )
    }

    submitSignup(ctx) {
        fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: ctx.state.username,
                pass: ctx.state.signUpPass1,
                displayName: ctx.state.displayName
            })
        }).then(function(response) {
            return response.json();
        }).then(function(myJson) {
        });
    }

    submitLogin(ctx) {
        fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: ctx.state.username,
                pass: ctx.state.password,
            })
        }).then(function(response) {
            return response.json();
        }).then(function(myJson) {
        });
    }

    /**
     * Renders form that includes sign up and login panels
     * @return  {React.Component}   Rendered component
     */
    createSignupLoginForm() {
        return (
            <div style={SignupLoginStyles.signupLoginFormStyle}>
                {this.createSignupPane()}
                {this.createLoginPane()}
            </div>
        );
    }

    /**
     * Renders sign-up/login form component
     * @return  {React.Component}   Rendered component
     */
    render() {
        return (
            this.createSignupLoginForm()
        );
    }
}

module.exports = SignupLogin;