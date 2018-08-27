import React from 'react';
import { NavLink } from 'react-router-dom';

import NavigationBarStyles from './NavigationBarStyles';

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderNameField(userData) {
        if (userData.user.username && userData.user.username != "") {
            return (
                <div style={{display: "flex", flexDirection: "row"}}>
                    {`Welcome ${userData.user.username}!`}
                    <div style={{marginLeft: 22, cursor: "pointer"}} onClick={() => {
                        userData.updateUser({
                            userId: -1,
                            username: ""
                        });
                    }}>Logout</div>
                </div>
            );
        }
        return (
            <NavLink exact to="/login" style={NavigationBarStyles.navigationBarLoginLink}>
                Login
            </NavLink>
        );
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
                    <this.props.UserContext.Consumer>
                        {(userData) => {return this.renderNameField(userData)}}
                    </this.props.UserContext.Consumer>
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