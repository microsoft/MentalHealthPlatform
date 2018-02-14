import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Link, IndexRoute, hashHistory, browserHistory, withRouter } from 'react-router-dom';

const formTitleStyle = {
    fontFamily: "Calibri",
    textAlign: "center",
    color: "#181818"
};

const signupPaneStyle = {
    border: "1px solid #CCCCCC"
};

const loginPaneStyle = {
    border: "1px solid #CCCCCC"
};

class SignupLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    createSignupPane() {
        return (
            <div style={signupPaneStyle}>
                <form>
                    <h1 style={formTitleStyle}>Sign Up</h1>
                    <div>
                        <input type="text" placeholder="Username" name="username" required />
                        <input type="text" placeholder="Email Address" name="email" required />
                        <input type="password" placeholder="Password" name="password" required />
                        <input type="password" placeholder="Confirm Password" name="confirm-password" required />
                        <button type="submit">Login</button>
                    </div>
                    <div>
                        <a href="#">Forgot your password?</a>
                    </div>                
                </form>
            </div>
        )
    }
    
    createLoginPane() {
        return (
            <div style={loginPaneStyle}>
                <form>
                    <h1 style={formTitleStyle}>Log In</h1>
                    <div>
                        <input type="text" placeholder="Username" name="username" required />
                        <input type="password" placeholder="Password" name="password" required />
                        <button type="submit">Login</button>
                    </div>
                    <div>
                        <a href="#">Forgot your password?</a>
                    </div>                
                </form>
            </div>
        )
    }

    createLoginForm() {
        return (
            <div>
                {this.createSignupPane()}
                {this.createLoginPane()}
            </div>            
        );
    }

    render() {
        return (
            this.createLoginForm()
        );
    }
}

module.exports = withRouter(SignupLogin);