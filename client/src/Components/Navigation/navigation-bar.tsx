// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';

import * as classes from "./navigation-bar.css";
import { UserDataContext } from './../UserProvider';
import { LocalizationContext } from './../LocalizationProvider';
import profilePicturePlaceholder from "./../../images/profile_picture_placeholder.png";
import homeIcon from "./../../images/home_icon.png";

/**
 * Renders navigation bar
 * @return  {React.Component}   Rendered component
 */
const NavigationBar = () => {
    const { user, updateUser } = React.useContext(UserDataContext);
    const { getLocalizedString } = React.useContext(LocalizationContext);

    const renderNameField = () => {
        const onClickHandler = () => {
            const userInfo = {
                userId: -1,
                username: ""
            };
            updateUser(userInfo);
            localStorage.setItem('userId', userInfo.userId.toString());
            localStorage.setItem('username', userInfo.username.toString());
        };
    
        if (user && user.username && user.username.length > 0) {
            return (
                <div style={{display: "flex", flexDirection: "row"}}>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <img src={profilePicturePlaceholder} style={{ height: 30, width: 30, borderRadius: "50%", marginRight: 10 }} />
                        {user.username}
                    </div>
                    <div style={{ marginLeft: 30, cursor: "pointer", fontWeight: "lighter" }} onClick={onClickHandler}>{getLocalizedString("NAVIGATION_BAR_LOGOUT")}</div>
                </div>
            );
        }
        return <NavLink exact to="/login" className={classes.NavigationBarLoginLink}>{getLocalizedString("NAVIGATION_BAR_LOGIN")}</NavLink>;
    };

    return (
        <div className={classes.NavigationBar}>
            <div className={classes.NavigationBarLeft}>                
                <NavLink exact to="/" className={classes.NavigationBarTitleLink}>
                    <img src={homeIcon} style={{ width: 30, height: 30 }} />
                </NavLink>
                <Link className={classes.Link} to={`/`}>{getLocalizedString("NAVIGATION_BAR_DASHBOARD")}</Link>
                <Link className={classes.Link} to={`/topics`}>{getLocalizedString("NAVIGATION_BAR_FORUMS")}</Link>
                <Link className={classes.Link} to={`/contacts`}>{getLocalizedString("NAVIGATION_BAR_CONTACTS")}</Link>
            </div>
            <div className={classes.NavigationBarRight}>
                {renderNameField()}
            </div>
        </div>
    );
};

export default NavigationBar;