// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import React, { useState, useEffect } from 'react';
import { withRouter, match } from 'react-router-dom';

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

const TopicsProvider = (props: ITopicsProviderProps) => {
    const { match } = props;
    const [searchString, setSearchString] = useState(undefined);
    const [topicsData, setTopicsData] = useState(undefined);
    const [loading, setLoading] = useState(true);

    const updateSearchString = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchString(event.target.value);
    }
    
    const retrieveTopicsResponseHandler = (data: any) => {
        setTopicsData(data);
        setLoading(false);
    }

    const retrieveTopicsErrorHandler = (error: any) => {
        console.log(error);
    }

    const retrieveTopics = () => {
        baseGetRequest("gettopics", [], retrieveTopicsResponseHandler, retrieveTopicsErrorHandler);
    }

    useEffect(() => {
        retrieveTopics();
    }, []);

    return (
        <TopicsCanvas
            match={match}
            searchString={searchString}
            topicsData={topicsData}
            updateSearchString={updateSearchString}
            loading={loading}
        />
    );
}

export const Topics = withRouter(TopicsProvider);