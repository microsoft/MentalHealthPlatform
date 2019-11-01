// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

// import * as classes from './search-page.css';
import { SearchBar, ISearchBarComponentProps } from '../SearchBar/search-bar';
import * as classes from './search-page.css';
import LoadingBubbles from './../LoadingBubbles/loading-bubbles';

interface ISearchBarProps {
    children: any;
    loading: boolean;
    searchBarProps: ISearchBarComponentProps;
    header?: string;
    centerSearch?: boolean;
}

const SearchPage = (props: ISearchBarProps) => {
    const {
        children,
        loading,
        searchBarProps,
        header,
        centerSearch
    } = props;

    const { handleInputChange, query, placeholder } = searchBarProps;

    return (
        <div style={{ padding: 20, display: "flex", flexDirection: "column", alignItems: centerSearch ? "center" : "flex-start" }}>
            {header !== undefined ? <h1 className={classes.Header}>{header}</h1> : null}
            <SearchBar
                placeholder={placeholder}
                query={query}
                handleInputChange={handleInputChange}
            />
            {loading ? <LoadingBubbles containerStyles={{width: 1200}} isLoading={true} /> : children}
        </div>
    );
};

export default SearchPage;