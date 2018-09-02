import * as React from 'react';
import { withRouter } from 'react-router-dom';

import classes from "./SignupLogin.css";

import { BASE_URL } from '../../util/Helpers';

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
        // const agreementTextStyle = Object.assign({}, SignupLoginStyles.signupLoginFormTextStyle, {
        //     float: "left",
        //     marginLeft: "3px"
        // });

        let signupButtonClasses = classes.FormButton + " ";
        signupButtonClasses += this.isSignUpButtonEnabled() ? classes.Green : classes.Gray;
        const _this = this;

        return (
            <div className={classes.Pane}>
                {/* <form> */}
                    <h1 className={classes.FormTitle}>Sign Up</h1>
                    <div>
                        <input type="text" value={this.state.signUpFirstName} placeholder="First Name" name="name" required className={classes.FormTextInput} onChange={(e) => this.setState({signUpFirstName: e.target.value})} />
                        <input type="text" value={this.state.signUpUserName} placeholder="Username" name="username" required className={classes.FormTextInput} onChange={(e) => this.setState({signUpUserName: e.target.value})} />
                        <input type="password" value={this.state.signUpPass1} placeholder="Password" name="password" required className={classes.FormTextInput} onChange={(e) => this.setState({signUpPass1: e.target.value})} />
                        <input type="password" value={this.state.signUpPass2} placeholder="Confirm Password" name="confirm-password" required className={classes.FormTextInput} onChange={(e) => this.setState({signUpPass2: e.target.value})} />
                        <button type="submit" onClick={(e) => this.submitSignup(_this)} className={signupButtonClasses} disabled={!this.isSignUpButtonEnabled()}>Sign Up</button>
                    </div>
                    {/* <div style={SignupLoginStyles.agreementContainerStyle}>
                        <input type="checkbox" name="agree" style={SignupLoginStyles.agreementCheckboxStyle} />
                        <span style={agreementTextStyle}>By creating an account you agree to our <a href="#" style={SignupLoginStyles.formLinkStyle}>Terms & Privacy</a>.</span>
                    </div>                 */}
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
    createLoginPane(userData) {
        let loginButtonClasses = classes.FormButton + " ";
        loginButtonClasses += this.isLoginButtonEnabled() ? classes.Green : classes.Gray;
        const _this = this;

        return (
            <div className={classes.Pane} style={{borderLeft: "1px solid #CCCCCC"}}>
                {/* <form> */}
                    <h1 className={classes.FormTitle}>Log In</h1>
                    <div>
                        <input type="text" value={this.state.username} placeholder="Username" name="username" required className={classes.FormTextInput} onChange={(e) => this.setState({username: e.target.value})} />
                        <input type="password" value={this.state.password} placeholder="Password" name="password" required className={classes.FormTextInput} onChange={(e) => this.setState({password: e.target.value})} />
                        <button onClick={(e) => this.submitLogin(_this, userData)} disabled={!this.isLoginButtonEnabled} type="submit" className={loginButtonClasses}>Login</button>
                    </div>
                    {/* <div style={SignupLoginStyles.forgotPasswordContainerStyle}>
                        <span style={SignupLoginStyles.signupLoginFormTextStyle}><a href="#" style={SignupLoginStyles.formLinkStyle}>Forgot your password?</a></span>
                    </div>                 */}
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
                username: ctx.state.signUpUsername,
                pass: ctx.state.signUpPass1,
                displayName: ctx.state.signUpFirstName
            })
        }).then(function(response) {
            return response.json();
        }).then(function(myJson) {
        });
    }

    submitLogin(ctx, userData) {        
        const username = ctx.state.username;
        const pass = ctx.state.pass;
        fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                pass: ctx.state.password,
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
                ctx.props.history.push("/");
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
    createSignupLoginForm() {

        return (
            <div className={classes.Background}>
                <div className={classes.SignupLoginForm}>
                    {this.createSignupPane()}
                    <this.props.UserContext.Consumer>
                        {(userData) => {return this.createLoginPane(userData)}}
                    </this.props.UserContext.Consumer>
                    
                </div>
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

export const SignupLogin =  withRouter(SignupLogin);