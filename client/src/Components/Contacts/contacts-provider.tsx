// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import React, { useState, useEffect } from 'react';

import { baseGetRequest } from "../../util/base-requests";
import ContactsCanvas from './contacts-canvas';

export interface IContactData {
    _id: string;
    title: string;
    desc: string;
    link: string;
};

export const Contacts = () => {
    const [contactsData, setContactsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const retrieveContactsResponseHandler = (data: any) => {
        setContactsData(data && data.contacts);
        setIsLoading(false);
    }

    const retrieveContactsErrorHandler = (error: any) => {
        console.error(error);
        setIsLoading(false);
    }

    const retrieveContacts = () => {
        const params = [{}];
        baseGetRequest("getcontacts", params, retrieveContactsResponseHandler, retrieveContactsErrorHandler);
    }

    // TODO: Add progress indicator upon submission
    // Issue #42: Add progress indicator for submission of contact creation

    const submitContactsResponseHandler = (data: any) => {
        // TODO: Add status message constants
        // Issue #43: Add status message constants in client
		if (data && data.statusMessage === 1) {
            retrieveContacts();
        }
	}

	const submitContactsErrorHandler = (error: any) => {
        console.log(error);
	}

    useEffect(() => {
        retrieveContacts();
    }, []);
    
    return (
        <ContactsCanvas
            contactsData={contactsData}
            isLoading={isLoading}
            submitContactsResponseHandler={submitContactsResponseHandler}
            submitContactsErrorHandler={submitContactsErrorHandler}
        />
    );
}