// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from "react";

import { baseGetRequest } from "../../util/base-requests";
import ContactsCanvas from './contacts-canvas';

export interface IContactData {
    _id: string;
    title: string;
    desc: string;
    link: string;
};

interface IContactsProviderProps {
}

interface IContactsProviderState {
    contactsData: IContactData[]
}

export class Contacts extends React.Component<IContactsProviderProps, IContactsProviderState> {
    constructor(props: IContactsProviderProps) {
        super(props);
        this.state = {
            contactsData: []
        };
    }

    /**
     * Renders forum component
     * @return  {React.Component}   Rendered component
     */
    render = () => {
        return (
            <ContactsCanvas
                contactsData={this.state.contactsData}
            />
        );
    }

    componentDidMount = () => {
        this.retrieveContacts();
    }

    retrieveContactsResponseHandler = (data: any) => {
        this.setState({
            contactsData: data && data.contacts
        });
    }

    retrieveContactsErrorHandler = (error: any) => {
        console.error(error);
    }

    retrieveContacts = () => {
        const params = [{}];
        baseGetRequest("getcontacts", params, this.retrieveContactsResponseHandler, this.retrieveContactsErrorHandler);
    }
}