// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import searchIcon from '../../images/search_icon.png';
import * as classes from "./topics-search-bar.css";

export interface ITopicsSearchBarProps {
    inputChanged: (searchString: string) => void;
}

const searchStringChangedHandler = (event: React.ChangeEvent<HTMLInputElement>, inputChanged: (searchString: string) => void) => {
    inputChanged(event.target.value);
}

const TopicsSearchBar = (props: ITopicsSearchBarProps) => {
    return (
        <div className={classes.TopicsSearchBar}>
            <input 
                type="text"
                placeholder="Search for topics"
                className={classes.TextInput}
                onChange={(e) => searchStringChangedHandler(e, props.inputChanged)} />
            <button
                className={classes.SubmitInput}
                type='submit'>
                <input type="image" src={searchIcon} className={classes.SearchIcon} />
            </button>
        </div>
    );
};

export default TopicsSearchBar;