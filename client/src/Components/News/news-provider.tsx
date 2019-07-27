// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from "react";

import { baseGetRequest } from "../../util/base-requests";
import NewsCanvas from './news-canvas';

export interface INewsData {
    _id: string;
    title: string;
    desc: string;
    date: string;
};

interface INewsProviderProps {
}

interface INewsProviderState {
    newsData: INewsData[],
    isLoading: boolean
}

export class News extends React.Component<INewsProviderProps, INewsProviderState> {
    constructor(props: INewsProviderProps) {
        super(props);
        this.state = {
            newsData: [],
            isLoading: true
        };
    }

    /**
     * Renders forum component
     * @return  {React.Component}   Rendered component
     */
    render = () => {
        return (
            <NewsCanvas
                newsData={this.state.newsData}
                isLoading={this.state.isLoading}
            />
        );
    }

    componentDidMount = () => {
        this.retreiveNews();
    }

    retrieveNewsResponseHandler = (data: any) => {
        this.setState({
            newsData: data && data.news,
            isLoading: false
        });
    }

    retrieveNewsErrorHandler = (error: any) => {
        console.error(error);
        this.setState({
            isLoading: false
        });
    }

    retreiveNews = () => {
        const params = [{}];
        baseGetRequest("getnews", params, this.retrieveNewsResponseHandler, this.retrieveNewsErrorHandler);
    }
}