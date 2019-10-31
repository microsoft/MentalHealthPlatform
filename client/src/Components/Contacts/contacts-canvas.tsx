// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import ReactLoading from 'react-loading';

import * as classes from "./contacts.css";
import { IContactData } from './contacts-provider';
import { LocalizationContext } from './../LocalizationProvider';

interface IContactsProps {
    contactsData: IContactData[],
    isLoading: boolean
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
    const { contactsData, isLoading } = props;
    const { getLocalizedString } = React.useContext(LocalizationContext);

    const contacts = contactsData.map((contactData, i) => renderContact(contactData, i));

    return (
        <div className={classes.Container}>
            <h1 className={classes.Header}>{getLocalizedString("CONTACTS_HEADER")}</h1>
            {isLoading ? (
                <div className={classes.Loading}>
                    <ReactLoading type="bubbles" color="rgb(13, 103, 151)" height={'5%'} width={'5%'} />
                </div>
            ) : contacts}
        </div>  
    );
};

export default Contacts;