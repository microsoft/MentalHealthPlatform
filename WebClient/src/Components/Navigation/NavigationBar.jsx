import * as React from 'react';
import { NavLink } from 'react-router-dom';

import classes from "./NavigationBar.css";

export class NavigationBar extends React.Component {
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
            <NavLink exact to="/login" className={classes.NavigationBarLoginLink}>
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
            <div className={classes.NavigationBar}>
                <div className={classes.NavigationBarLeft}>                
                    <NavLink exact to="/" className={classes.NavigationBarTitleLink}>Mental Health Forum</NavLink>
                </div>
                <div className={classes.NavigationBarRight}>
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