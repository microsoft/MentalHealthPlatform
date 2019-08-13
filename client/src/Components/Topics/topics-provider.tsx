// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { withRouter, RouteComponentProps, match } from 'react-router-dom';

import TopicsCanvas from "./topics-canvas";
import { baseGetRequest } from "./../../util/base-requests";

export interface ITopicData {
    topicTitle: string;
    image: string;
    _id: string;
}

interface ITopicsProviderProps {
    match: match<{}>;
}

interface ITopicsProviderState {
    match: match<{}>;
    searchString: string;
    topicsData: ITopicData[];
    loading: boolean;
}

class TopicsProviderClass extends React.Component<RouteComponentProps<ITopicsProviderProps>, ITopicsProviderState> {
    constructor(props: RouteComponentProps<ITopicsProviderProps>) {
        super(props);
        this.state = {
            match: props.match,
            searchString: undefined,
            topicsData: undefined,
            loading: true
        };
    }

    updateSearchString = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({searchString: event.target.value});
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
                loading={this.state.loading}
            />
        );
    }

    componentDidMount = () => {
        this.retrieveTopics();
    }

    retrieveTopicsResponseHandler = (data: any) => {
        this.setState({
            topicsData: data,
            loading: false
        });
    }

    retrieveTopicsErrorHandler = (error: any) => {
        console.log(error);
    }

    retrieveTopics = () => {
        baseGetRequest("gettopics", [], this.retrieveTopicsResponseHandler, this.retrieveTopicsErrorHandler);
    }
}

export const Topics = withRouter(TopicsProviderClass);