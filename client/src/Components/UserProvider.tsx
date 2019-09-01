// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import React, { useState } from 'react';

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

export const UserProvider = (props: { children: any }) => {
    const { children } = props;
    
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');

    const [user, setUser] = useState({
        userId: parseInt(userId),
        username: username
    });
    
    const updateUser = (userData: UserDataType) => {
        setUser({
            userId: userData.userId,
            username: userData.username
        });
    }

    return (
        <UserDataContext.Provider value={{ user, updateUser }}>
            {children}
        </UserDataContext.Provider>
    );
}