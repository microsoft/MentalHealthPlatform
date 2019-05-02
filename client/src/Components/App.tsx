// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import { NavigationBar } from './Navigation/NavigationBar';
import { Topics } from './Topics/Topics';
import { SignupLogin } from './SignupLogin/SignupLogin';
import { Forum } from './Forum/Forum';
import { Chat } from './Chat/chat-provider';   
import { CreateChat } from './Chat/create-chat-provider';

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
        this.state = {
            user: {
                userId: -1,
                username: ""
            },
            updateUser: this.updateUser
        };
    }

    render = () => {
        return (
            <UserDataContext.Provider value={this.state}>
                <BrowserRouter>
                    <div>
                        <NavigationBar />
                        <div>
                            <Route exact path="/" render={() => <Redirect to="/topics" />} />
                            <Route exact path="/topics" component={() => <Topics />} />
                            <Route exact path="/login" component={() => <SignupLogin />} />
                            <Route exact path={`/topics/topic:topicID`} component={() => <Forum />} />
                            <Route exact path={`/topics/topic:topicID/chat/:chatID`} component={() => <Chat UserContext={UserDataContext} />} />
                            <Route exact path={`/topics/topic:topicID/createChat`} component={() => <CreateChat UserContext={UserDataContext} />} />
                        </div>
                    </div>
                </BrowserRouter>
            </UserDataContext.Provider>
        );
    }
}