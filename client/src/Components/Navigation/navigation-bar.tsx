// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { NavLink } from 'react-router-dom';

import * as classes from "./navigation-bar.css";
import { IUserContext, UserDataContext } from '../App';
import profilePicturePlaceholder from "./../../images/profile_picture_placeholder.png";
import homeIcon from "./../../images/home_icon.png";

const renderNameField = (userContext: IUserContext) => {
    if (userContext.user && userContext.user.username && userContext.user.username.length > 0) {
        return (
            <div style={{display: "flex", flexDirection: "row"}}>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <img src={profilePicturePlaceholder} style={{ height: 30, width: 30, borderRadius: "50%", marginRight: 10 }} />
                    {userContext.user.username}
                </div>
                <div style={{ marginLeft: 30, cursor: "pointer", fontWeight: "lighter" }} onClick={() => {
                    const userInfo = {
                        userId: -1,
                        username: ""
                    };
                    userContext.updateUser(userInfo);
                    localStorage.setItem('userId', userInfo.userId.toString());
                    localStorage.setItem('username', userInfo.username.toString());
                }}>Logout</div>
            </div>
        );
    }
    return <NavLink exact to="/login" className={classes.NavigationBarLoginLink}>Login</NavLink>;
};

/**
 * Renders navigation bar
 * @return  {React.Component}   Rendered component
 */
const NavigationBar = () => {
    return (
        <div className={classes.NavigationBar}>
            <div className={classes.NavigationBarLeft}>                
                <NavLink exact to="/" className={classes.NavigationBarTitleLink}>
                    <img src={homeIcon} style={{ width: 30, height: 30 }} />
                </NavLink>
            </div>
            <div className={classes.NavigationBarRight}>
                <UserDataContext.Consumer>
                    {(userData) => renderNameField(userData)}
                </UserDataContext.Consumer>
            </div>
        </div>
    );
};

export default NavigationBar;