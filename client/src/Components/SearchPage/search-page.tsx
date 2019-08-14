// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import ReactLoading from 'react-loading';

// import * as classes from './search-page.css';
import { SearchBarProvider, ISearchBarProviderProps } from '../SearchBar/search-bar-provider';

import * as classes from './search-page.css';

interface ISearchBarProps {
    children: any;
    loading: boolean;
    header: string;
    searchBarProps: ISearchBarProviderProps;
}

const SearchPage = (props: ISearchBarProps) => {
    const {
        children,
        loading,
        searchBarProps,
        header
    } = props;

    const { handleInputChange, query, placeholder } = searchBarProps;

    return (
        <div style={{ padding: 20 }}>
            <h1 className={classes.Header}>{header}</h1>
            <SearchBarProvider
                placeholder={placeholder}
                query={query}
                handleInputChange={handleInputChange}
            />
            {loading ? (
                <div className={classes.Loading}>
                    <ReactLoading type="bubbles" color="rgb(13, 103, 151)" height={'5%'} width={'5%'} />
                </div>
            ) : children}
        </div>
    );
};

export default SearchPage;