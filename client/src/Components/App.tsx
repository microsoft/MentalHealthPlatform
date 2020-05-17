// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import { UserProvider } from './UserProvider';
import { LocalizationProvider } from './LocalizationProvider';

import NavigationBar from './Navigation/navigation-bar';
import { Topics } from './Topics/topics-provider';
import { SignupLogin } from './SignupLogin/signup-login-provider';
import { Forum } from './Forum/forum-provider';
import { Chat } from './Chat/chat-provider';   
import { CreateChat } from './CreateChat/create-chat-provider';
import { Contacts } from './Contacts/contacts-provider';
import Dashboard from './Dashboard/dashboard';
import Crisis from './Crisis/crisis';
import Events from './Events/events-provider';
import { LocalizationContext } from './LocalizationProvider';
import * as classes from './app.css';

const AppBody = () => (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, overflowY: "auto" }}>
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/crisis" component={Crisis} />
        <Route exact path="/events" component={Events} />
        <Route exact path="/topics" component={Topics} />
        <Route exact path="/login" component={SignupLogin} />
        <Route exact path="/contacts" component={Contacts} />
        <Route exact path="/topics/topic:topicID" component={Forum} />
        <Route exact path="/topics/topic:topicID/chat/:chatID" component={Chat} />
        <Route exact path="/topics/topic:topicID/createChat" component={CreateChat} />
    </div>
);

const AppFooter = () => {
    const { getLocalizedString } = React.useContext(LocalizationContext);
    return (
        <div className={classes.AppFooter}>
            {`${getLocalizedString("FOOTER_COPYRIGHT", [(new Date().getFullYear()).toString(), "NAME"])}`}
        </div>
    )
};

const AppProviders = (props: { children: any }) => (
    <UserProvider>
        <LocalizationProvider>
            {props.children}
        </LocalizationProvider>
    </UserProvider>
);

const App = () => (
    <AppProviders>
        <BrowserRouter>
            <div className={classes.AppContainer}>
                <NavigationBar />
                <AppBody />
                <AppFooter />
            </div>
        </BrowserRouter>
    </AppProviders>
);

export default App;