// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import React, { useState } from 'react';

import * as englishStrings from './../res/strings/1033.json';
import * as frenchStrings from './../res/strings/1036.json';

const EN_US = 1033; // English (USA)
const FR_FR = 1036; // French (France)

export interface IStringData {
    [key: string]: {
        description: string,
        value: string
    }
}

export interface ILocalizationContext {
    getLocalizedString: (key: string, values?: string[]) => string;
    strings: IStringData | undefined;
    updateLanguage: (language: number) => void;
}

export const LocalizationContext = React.createContext<ILocalizationContext>({
    getLocalizedString: undefined,
    strings: undefined,
    updateLanguage: undefined
});

export const LocalizationProvider = (props: { children: any }) => {
    const { children } = props;
    
    const storedLanguage = parseInt(localStorage.getItem("language"));
    const [language, setLanguage] = useState(storedLanguage ? storedLanguage : EN_US);

    const getStrings = (languageCode: number) => {
        switch (languageCode) {
            case FR_FR:
                return frenchStrings as IStringData;
            case EN_US:
            default:
                return englishStrings as IStringData;
        }
    };
    const [strings, setStrings] = useState(getStrings(language));
    
    const getLocalizedString = (key: string, values?: string[]) => {
        const languageCode = EN_US;
        const strings = getStrings(languageCode);
    
        let resourceString = strings[key] && strings[key].value || key;
        
        if (values) {
            values.forEach((value, i) => {
                const placeholder = '{' + i + '}';
                resourceString = resourceString.replace(placeholder, value);
            });
        }
    
        return resourceString;
    };
    
    const updateLanguage = (language: number) => {
        setLanguage(language);
        localStorage.setItem("language", language.toString());
        setStrings(getStrings(language));
    }

    return (
        <LocalizationContext.Provider value={{ getLocalizedString, strings, updateLanguage }}>
            {children}
        </LocalizationContext.Provider>
    );
}