import React from 'react';

import SignupLoginStyles from './SignupLoginStyles';

const BASE_URL = `http://127.0.0.1:3000`

class SignupLogin extends React.Component {

    constructor(props) {
        super(props);
        const _this = this;
        this.state = {
            username: "",
            password: ""
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

        return (
            <div style={SignupLoginStyles.paneStyle}>
                <form>
                    <h1 style={SignupLoginStyles.formTitleStyle}>Sign Up</h1>
                    <div>
                        <input type="text" placeholder="Username" name="username" required style={SignupLoginStyles.formTextInputStyle} />
                        <input type="text" placeholder="Email Address" name="email" required style={SignupLoginStyles.formTextInputStyle} />
                        <input type="password" placeholder="Password" name="password" required style={SignupLoginStyles.formTextInputStyle} />
                        <input type="password" placeholder="Confirm Password" name="confirm-password" required style={SignupLoginStyles.formTextInputStyle} />
                        <button type="submit" style={SignupLoginStyles.formButtonStyle}>Sign Up</button>
                    </div>
                    <div style={SignupLoginStyles.agreementContainerStyle}>
                        <input type="checkbox" name="agree" style={SignupLoginStyles.agreementCheckboxStyle} />
                        <span style={agreementTextStyle}>By creating an account you agree to our <a href="#" style={SignupLoginStyles.formLinkStyle}>Terms & Privacy</a>.</span>
                    </div>                
                </form>
            </div>
        )
    }
    
    /**
     * Renders login panel in overall sign-up/login form
     * @return  {React.Component}   Rendered component
     */
    createLoginPane() {
        const loginPaneStyle = Object.assign({}, SignupLoginStyles.paneStyle, {
            borderLeft: "1px solid #CCCCCC"
        });

        const _this = this;
        return (
            <div style={loginPaneStyle}>
                {/* <form> */}
                    <h1 style={SignupLoginStyles.formTitleStyle}>Log In</h1>
                    <div>
                        <input type="text" value={this.state.username} placeholder="Username" name="username" required style={SignupLoginStyles.formTextInputStyle} onChange={(e) => this.setState({username: e.target.value})} />
                        <input type="password" value={this.state.password} placeholder="Password" name="password" required style={SignupLoginStyles.formTextInputStyle} onChange={(e) => this.setState({password: e.target.value})} />
                        <button onClick={(e) => this.submitLogin(_this)} type="submit" style={SignupLoginStyles.formButtonStyle}>Login</button>
                    </div>
                    <div style={SignupLoginStyles.forgotPasswordContainerStyle}>
                        <span style={SignupLoginStyles.signupLoginFormTextStyle}><a href="#" style={SignupLoginStyles.formLinkStyle}>Forgot your password?</a></span>
                    </div>                
                {/* </form> */}
            </div>
        )
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
                password: ctx.state.password,
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