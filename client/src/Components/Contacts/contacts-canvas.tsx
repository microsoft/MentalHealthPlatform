// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import * as classes from "./contacts.css";
import { IContactData } from './contacts-provider';

interface IContactsProps {
    contactsData: IContactData[]
}

const renderContact = (contactData: IContactData, key: number) => {
    return (
        <div className={classes.ContactContainer} key={key}>
            <h2 className={classes.Title}>{contactData.title}</h2>
            <div className={classes.Description}>{contactData.desc}</div>
            <a className={classes.Link} href={contactData.link} target={"_blank"}>{contactData.link}</a>
        </div>
    );
};

const Contacts = (props: IContactsProps) => {
    const {
        contactsData
    } = props;

    const contacts = [];
    for (let i = 0; i < contactsData.length; i++) {
        contacts.push(renderContact(contactsData[i], i));
    }

    return (
        <div className={classes.Container}>
            <h1 className={classes.Header}>Contacts</h1>
            {contacts}
        </div>  
    );
};

export default Contacts;