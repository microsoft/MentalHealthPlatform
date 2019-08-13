// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from "react";

import SearchBarCanvas from './search-bar-canvas';

interface ISearchBarProviderProps {
    placeholder: string;
    query: string;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ISearchBarProviderStates {
}

export default class SearchBarProvider extends React.Component<ISearchBarProviderProps, ISearchBarProviderStates> {
    constructor(props: ISearchBarProviderProps) {
        super(props);
        this.state = {
        };
    }

    /**
     * Renders forum component
     * @return  {React.Component}   Rendered component
     */
    render = () => {
        return (
            <SearchBarCanvas
                placeholder={this.props.placeholder}
                handleInputChange={this.props.handleInputChange}
                query={this.props.query}
            />
        );
    }
}