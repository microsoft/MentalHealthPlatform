// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import * as classes from "./contacts.css";
import { IContactData } from './contacts-provider';
import { LocalizationContext } from './../LocalizationProvider';
import LoadingBubbles from './../LoadingBubbles/loading-bubbles';

interface IContactsProps {
    contactsData: IContactData[],
    isLoading: boolean
}

enum FORM_TYPE {
    TEXT_INPUT
}

interface IInputData {
    key: string;
    type: FORM_TYPE;
    description: string;
};

const renderTextInput = (inputData: IInputData) => {
    const textInputStyles: any = {
        padding: 5,
        marginBottom: 10,
        borderRadius: 5,
        fontSize: "large",
        border: "1px solid #CCCCCC",
        height: 42,
        boxSizing: "border-box"
    };
    
    return <input style={textInputStyles} placeholder={inputData.description} />;
};

const renderButton = () => {
    const submitButtonStyles = {
        backgroundColor: "rgb(13, 103, 151)",
        color: "#FFFFFF",
        borderRadius: 5,
        borderWidth: 0,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        fontSize: "large",
        height: 42
    }

    return <button style={submitButtonStyles}>Submit</button>;
}

const CreateForm = (props: {children: any}) => {
    const createFormStyles: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: 1200,
        boxSizing: "border-box",
        padding: 20,
        borderRadius: 5,
        backgroundColor: "#FFFFFF",
        marginBottom: 30
    };
    
    return <div style={createFormStyles}>{props.children}</div>;
};

// TODO: Refactor logic into reusable component, move all in-line styles to spreadsheets
// Issue #41: Create reusable "create form" component
const renderContactCreateForm = () => {
    const createFormParameters = {
        header: "Add Contact",
        fields: [
            {
                key: "title",
                type: FORM_TYPE.TEXT_INPUT,
                description: "Contact title"
            },
            {
                key: "desc",
                type: FORM_TYPE.TEXT_INPUT,
                description: "Contact description"
            },
            {
                key: "title",
                type: FORM_TYPE.TEXT_INPUT,
                description: "Link (ex. https://suicidepreventionlifeline.org)"
            }
        ]
    }

    const header = <h2 className={classes.Title}>{createFormParameters.header}</h2>;

    const fields = createFormParameters.fields && createFormParameters.fields.map(input => {
        switch (input.type) {
            case FORM_TYPE.TEXT_INPUT:
            default:
                return renderTextInput(input);
        }
    });

    const button = renderButton();

    const createFormComponents = [header, ...fields, button];

    return <CreateForm>{createFormComponents}</CreateForm>;
};

const renderContact = (contactData: IContactData, key: number) => (
    <div className={classes.ContactContainer} key={key}>
        <h2 className={classes.Title}>{contactData.title}</h2>
        <div className={classes.Description}>{contactData.desc}</div>
        <a className={classes.Link} href={contactData.link} target={"_blank"}>{contactData.link}</a>
    </div>
);

const Contacts = (props: IContactsProps) => {
    const { contactsData, isLoading } = props;
    const { getLocalizedString } = React.useContext(LocalizationContext);

    const contacts = contactsData.map((contactData, i) => renderContact(contactData, i));

    return (
        <div className={classes.Container}>
            <h1 className={classes.Header}>{getLocalizedString("CONTACTS_HEADER")}</h1>
            {renderContactCreateForm()}
            {isLoading ? <LoadingBubbles isLoading={true} containerStyles={{width: "100%"}} /> : contacts}
        </div>  
    );
};

export default Contacts;