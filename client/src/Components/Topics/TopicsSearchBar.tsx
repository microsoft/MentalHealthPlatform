// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import searchIcon from '../../images/search_icon.png';
import * as classes from "./TopicsSearchBar.css";

export interface ITopicsSearchBarProps {
    inputChanged: (searchString: string) => void;
}

export class TopicsSearchBar extends React.Component<ITopicsSearchBarProps, {}> {
    
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    searchStringChangedHandler = (event) => {
        this.props.inputChanged(event.target.value);
    }

    /**
     * Renders topics search bar component
     * @return  {React.Component}   Rendered component
     */
    render = () => {
        return (
            <div className={classes.TopicsSearchBar}>
                <input 
                    type="text"
                    placeholder="Search Topics" 
                    className={classes.TextInput}
                    onChange={this.searchStringChangedHandler} />
                <button
                    className={classes.SubmitInput}
                    type='submit'>
                    <input type="image" src={searchIcon} className={classes.SearchIcon} />
                </button>
            </div>
        );
    }
}