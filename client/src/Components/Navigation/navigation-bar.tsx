// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';

import * as classes from "./navigation-bar.css";
import { IUserContext, UserDataContext } from '../UserProvider';
import profilePicturePlaceholder from "./../../images/profile_picture_placeholder.png";
import homeIcon from "./../../images/home_icon.png";
import localization from './../../res/strings/localization';

const renderNameField = (userContext: IUserContext) => {
    const onClickHandler = () => {
        const userInfo = {
            userId: -1,
            username: ""
        };
        userContext.updateUser(userInfo);
        localStorage.setItem('userId', userInfo.userId.toString());
        localStorage.setItem('username', userInfo.username.toString());
    };

    if (userContext.user && userContext.user.username && userContext.user.username.length > 0) {
        return (
            <div style={{display: "flex", flexDirection: "row"}}>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <img src={profilePicturePlaceholder} style={{ height: 30, width: 30, borderRadius: "50%", marginRight: 10 }} />
                    {userContext.user.username}
                </div>
                <div style={{ marginLeft: 30, cursor: "pointer", fontWeight: "lighter" }} onClick={onClickHandler}>{localization.getLocalizedString("NAVIGATION_BAR_LOGOUT")}</div>
            </div>
        );
    }
    return <NavLink exact to="/login" className={classes.NavigationBarLoginLink}>{localization.getLocalizedString("NAVIGATION_BAR_LOGIN")}</NavLink>;
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
                <Link className={classes.Link} to={`/`}>{localization.getLocalizedString("NAVIGATION_BAR_DASHBOARD")}</Link>
                <Link className={classes.Link} to={`/topics`}>{localization.getLocalizedString("NAVIGATION_BAR_FORUMS")}</Link>
                <Link className={classes.Link} to={`/contacts`}>{localization.getLocalizedString("NAVIGATION_BAR_CONTACTS")}</Link>
                <Link className={classes.Link} to={`/news`}>{localization.getLocalizedString("NAVIGATION_BAR_NEWS")}</Link>
                <Link className={classes.Link} to={`/events`}>{localization.getLocalizedString("NAVIGATION_BAR_EVENTS")}</Link>
                <Link className={classes.Link} to={`/therapists`}>{localization.getLocalizedString("NAVIGATION_BAR_THERAPISTS")}</Link>
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