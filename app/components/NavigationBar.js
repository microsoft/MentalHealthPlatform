import React from 'react';
import { NavLink } from 'react-router-dom';

import NavigationBarStyles from './NavigationBarStyles';

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    renderUser(user) {
        return user.username && user.username != "" ? "Welcome " + user.username : "Login";
    }

    /**
     * Renders navigation bar
     * @return  {React.Component}   Rendered component
     */
    createNavigationBar() {
        return (
            <div style={NavigationBarStyles.navigationBarStyle}>
                <div style={NavigationBarStyles.navigationBarLeftStyle}>                
                    <NavLink exact to="/" style={NavigationBarStyles.navigationBarTitleLink}>Mental Health Forum</NavLink>
                </div>
                <div style={NavigationBarStyles.navigationBarRightStyle}>
                    <NavLink exact to="/login" style={NavigationBarStyles.navigationBarLoginLink}>
                        <this.props.UserContext.Consumer>
                            {(userData) => {return this.renderUser(userData.user)}}
                        </this.props.UserContext.Consumer>
                    </NavLink>
                </div>
            </div>
        );
    }
    
    /**
     * Renders navigation bar component
     * @return  {React.Component}   Rendered component
     */
    render() {
        return this.createNavigationBar();
    }
}

module.exports = NavigationBar;