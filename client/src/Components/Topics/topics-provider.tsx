// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { withRouter, RouteComponentProps, match } from 'react-router-dom';

import TopicsCanvas from "./topics-canvas";
import { BASE_URL } from '../../util/Helpers';

export interface ITopicData {
    topicTitle: string;
}

interface ITopicsProviderProps {
    match: match<{}>;
}

interface ITopicsProviderState {
    match: match<{}>;
    searchString: string;
    topicsData: ITopicData[];
}

class TopicsProviderClass extends React.Component<RouteComponentProps<ITopicsProviderProps>, ITopicsProviderState> {
    constructor(props: RouteComponentProps<ITopicsProviderProps>) {
        super(props);
        this.state = {
            match: props.match,
            searchString: undefined,
            topicsData: undefined
        };
    }

    updateSearchString = (searchString: string) => {
        this.setState({searchString});
    }
    /**
     * Renders topics component including search bar and topics table
     * @return  {React.Component}   Rendered component
     */
    render = () => {
        return (
            <TopicsCanvas
                match={this.props.match}
                searchString={this.state.searchString}
                topicsData={this.state.topicsData}
                updateSearchString={this.updateSearchString}
            />
        );
    }

    componentDidMount = () => {
        const _this = this;
        fetch(`${BASE_URL}/gettopics`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(function(response) {
            const output = response.json();
            return output;
        }).then(function(data) {
            _this.setState({
                topicsData: data
            });
        });
    }
}

export const Topics = withRouter(TopicsProviderClass);