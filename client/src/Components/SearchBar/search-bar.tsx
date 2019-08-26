// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import * as classes from './search-bar.css';
import searchIcon from '../../images/search_icon.png';

export interface ISearchBarComponentProps {
    query: string;
    placeholder: string;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar = (props: ISearchBarComponentProps) => {
    const { query, handleInputChange, placeholder } = props;

    return (
        <div className={classes.SearchBar}>
            <input
                className={classes.TextInput}
                placeholder={placeholder}
                value={query}
                onChange={handleInputChange}
            />
            <button
                className={classes.SubmitInput}>
                <input type="image" src={searchIcon} className={classes.SearchIcon} />
            </button>
        </div>
    );
};