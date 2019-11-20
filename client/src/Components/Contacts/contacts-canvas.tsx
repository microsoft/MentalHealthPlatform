// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import * as classes from "./contacts.css";
import { IContactData } from './contacts-provider';
import { LocalizationContext } from './../LocalizationProvider';
import LoadingBubbles from './../LoadingBubbles/loading-bubbles';
import { CreateFormProvider } from './../CreateForm/create-form-provider';
import { FORM_TYPE } from './../CreateForm/create-form-interfaces';

interface IContactsProps {
    contactsData: IContactData[];
    isLoading: boolean;
    submitContactsResponseHandler: (data: any) => void;
    submitContactsErrorHandler: (error: any) => void;
}

const renderContact = (contactData: IContactData, key: number) => (
    <div className={classes.ContactContainer} key={key}>
        <h2 className={classes.Title}>{contactData.title}</h2>
        <div className={classes.Description}>{contactData.desc}</div>
        <a className={classes.Link} href={contactData.link} target={"_blank"}>{contactData.link}</a>
    </div>
);

const Contacts = (props: IContactsProps) => {
    const {
        contactsData,
        isLoading,
        submitContactsResponseHandler,
        submitContactsErrorHandler
    } = props;
    const { getLocalizedString } = React.useContext(LocalizationContext);

    const contacts = contactsData.map((contactData, i) => renderContact(contactData, i));

    const createFormParameters = {
        requestName: "createcontact",
		header: getLocalizedString("CONTACTS_CREATE_FORM_HEADER"),
		fields: [
            {
                key: "title",
                type: FORM_TYPE.TEXT_INPUT,
                description: getLocalizedString("CONTACTS_CREATE_FORM_INPUT_TITLE")
            },
            {
                key: "desc",
                type: FORM_TYPE.TEXT_INPUT,
                description: getLocalizedString("CONTACTS_CREATE_FORM_INPUT_DESCRIPTION")
            },
            {
                key: "link",
                type: FORM_TYPE.TEXT_INPUT,
                description: getLocalizedString("CONTACTS_CREATE_FORM_INPUT_LINK")
            }
		]
    };

    return (
        <div className={classes.Container}>
            <h1 className={classes.Header}>{getLocalizedString("CONTACTS_HEADER")}</h1>
            <CreateFormProvider
                createFormParameters={createFormParameters}
                handleSubmitResponseHandler={submitContactsResponseHandler}
                handleSubmitErrorHandler={submitContactsErrorHandler}
            />
            {isLoading ? <LoadingBubbles isLoading={true} containerStyles={{width: "100%"}} /> : contacts}
        </div>  
    );
};

export default Contacts;