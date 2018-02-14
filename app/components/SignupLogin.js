import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Link, IndexRoute, hashHistory, browserHistory, withRouter } from 'react-router-dom';

const signupLoginFormStyle = {
    display: "flex",
    flexDirection: "row",
    width: "80%",
    border: "1px solid #CCCCCC",
    padding: "20px",
    marginLeft: "auto",
    marginRight: "auto"
};

const formTitleStyle = {
    fontFamily: "Calibri",
    textAlign: "center",
    color: "#181818"
};

const signupLoginFormTextStyle = {
    fontFamily: "Calibri",
    color: "#181818",
    fontSize: "large"
};

const paneStyle = {
    padding: "30px",
    width: "50%",
    backgroundColor: "#FFFFFF"
};

const formTextInputStyle = {
    lineHeight: "30px",
    width: "100%",
    marginBottom: "20px",
    padding: "10px",
    fontSize: "x-large",
    boxSizing: "border-box",
    borderRadius: "5px",
    border: "1px solid #CCCCCC"
};

const formLinkStyle = {
    color: "dodgerblue"
};

const formButtonStyle = {
    backgroundColor: "#4CAF50",
    border: "none",
    color: "#FFFFFF",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "x-large",
    lineHeight: "30px",
    width: "100%",
    borderRadius: "5px"
};

class SignupLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    createSignupPane() {
        const agreementContainerStyle = {
            marginTop: "20px"
        };

        const agreementCheckboxStyle = {
            float: "left"
        };

        const agreementTextStyle = Object.assign({}, signupLoginFormTextStyle, {
            float: "left",
            marginLeft: "3px"
        });

        return (
            <div style={paneStyle}>
                <form>
                    <h1 style={formTitleStyle}>Sign Up</h1>
                    <div>
                        <input type="text" placeholder="Username" name="username" required style={formTextInputStyle} />
                        <input type="text" placeholder="Email Address" name="email" required style={formTextInputStyle} />
                        <input type="password" placeholder="Password" name="password" required style={formTextInputStyle} />
                        <input type="password" placeholder="Confirm Password" name="confirm-password" required style={formTextInputStyle} />
                        <button type="submit" style={formButtonStyle}>Sign Up</button>
                    </div>
                    <div style={agreementContainerStyle}>
                        <input type="checkbox" checked="checked" name="agree" style={agreementCheckboxStyle} />
                        <span style={agreementTextStyle}>By creating an account you agree to our <a href="#" style={formLinkStyle}>Terms & Privacy</a>.</span>
                    </div>                
                </form>
            </div>
        )
    }
    
    createLoginPane() {
        const loginPaneStyle = Object.assign({}, paneStyle, {
            borderLeft: "1px solid #CCCCCC"
        });

        const forgotPasswordContainerStyle = {
            marginTop: "20px",
            textAlign: "right"
        };

        return (
            <div style={loginPaneStyle}>
                <form>
                    <h1 style={formTitleStyle}>Log In</h1>
                    <div>
                        <input type="text" placeholder="Username" name="username" required style={formTextInputStyle} />
                        <input type="password" placeholder="Password" name="password" required style={formTextInputStyle} />
                        <button type="submit" style={formButtonStyle}>Login</button>
                    </div>
                    <div style={forgotPasswordContainerStyle}>
                        <span style={signupLoginFormTextStyle}><a href="#" style={formLinkStyle}>Forgot your password?</a></span>
                    </div>                
                </form>
            </div>
        )
    }

    createSignupLoginForm() {
        return (
            <div style={signupLoginFormStyle}>
                {this.createSignupPane()}
                {this.createLoginPane()}
            </div>            
        );
    }

    render() {
        return (
            this.createSignupLoginForm()
        );
    }
}

module.exports = withRouter(SignupLogin);