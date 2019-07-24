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
    newsData: INewsData[]
}

export class News extends React.Component<INewsProviderProps, INewsProviderState> {
    constructor(props: INewsProviderProps) {
        super(props);
        this.state = {
            newsData: []
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
            />
        );
    }

    componentDidMount = () => {
        this.retreiveNews();
    }

    retrieveNewsResponseHandler = (data: any) => {
        this.setState({
            newsData: data && data.news
        });
    }

    retrieveNewsErrorHandler = (error: any) => {
        console.error(error);
    }

    retreiveNews = () => {
        const params = [{}];
        baseGetRequest("getnews", params, this.retrieveNewsResponseHandler, this.retrieveNewsErrorHandler);
    }
}