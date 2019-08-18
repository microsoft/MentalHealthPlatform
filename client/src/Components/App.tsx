// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import NavigationBar from './Navigation/navigation-bar';
import { Topics } from './Topics/topics-provider';
import { SignupLogin } from './SignupLogin/signup-login-provider';
import { Forum } from './Forum/forum-provider';
import { Chat } from './Chat/chat-provider';   
import { CreateChat } from './CreateChat/create-chat-provider';
import { Contacts } from './Contacts/contacts-provider';
import { News } from './News/news-provider';
import Dashboard from './Dashboard/dashboard';
import Crisis from './Crisis/crisis';
import Therapists from './Therapists/therapists-provider';
import Events from './Events/events-provider';
import localization from './../res/strings/localization';

export type UserDataType = {
    userId: number;
    username: string;
};

export interface IUserContext {
    user: UserDataType | undefined,
    updateUser: (data: UserDataType) => void;
}

export const UserDataContext = React.createContext<IUserContext>({
    user: undefined,
    updateUser: undefined
});

export class UserProvider extends React.Component<{}, IUserContext> {
    private updateUser = (userData: UserDataType) => {
        this.setState(() => ({
            user: {
                userId: userData.userId,
                username: userData.username
            }
        }));
    };

    constructor(props: {}) {
        super(props);
        const userId = localStorage.getItem('userId');
        const username = localStorage.getItem('username');
        this.state = {
            user: {
                userId: parseInt(userId),
                username: username
            },
            updateUser: this.updateUser
        };
    }

    render = () => {
        return (
            <UserDataContext.Provider value={this.state}>
                <BrowserRouter>
                    <div style={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#E8E8E8" }}>
                        <NavigationBar />
                        <div style={{ display: "flex", flexDirection: "column", flex: 1, overflowY: "auto" }}>
                            <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
                            <Route exact path="/dashboard" component={Dashboard} />
                            <Route exact path="/crisis" component={Crisis} />
                            <Route exact path="/therapists" component={Therapists} />
                            <Route exact path="/events" component={Events} />
                            <Route exact path="/topics" component={Topics} />
                            <Route exact path="/login" component={SignupLogin} />
                            <Route exact path="/contacts" component={Contacts} />
                            <Route exact path="/news" component={News} />
                            <Route exact path={`/topics/topic:topicID`} component={Forum} />
                            <Route exact path={`/topics/topic:topicID/chat/:chatID`} component={() => <Chat UserContext={UserDataContext} />} />
                            <Route exact path={`/topics/topic:topicID/createChat`} component={() => <CreateChat UserContext={UserDataContext} />} />
                        </div>
                        <div style={{ paddingTop: 10, paddingBottom: 20, color: "#686868", fontFamily: "'Calibri', 'Gill Sans', 'Gill Sans MT', 'Trebuchet MS', sans-serif", textAlign: "center" }}>
                            {`${localization.getLocalizedString("FOOTER_COPYRIGHT", [(new Date().getFullYear()).toString(), "NAME"])}`}
                        </div>
                    </div>
                </BrowserRouter>
            </UserDataContext.Provider>
        );
    }
}