// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from "react";

import { baseGetRequest } from "../../util/base-requests";
import { INewsData } from './../News/news-provider';
import NewsPreviewCanvas from "./news-preview";

interface INewsPreviewProviderProps {
}

interface INewsPreviewProviderState {
    newsData: INewsData[]
}

export class NewsPreviewProvider extends React.Component<INewsPreviewProviderProps, INewsPreviewProviderState> {
    constructor(props: INewsPreviewProviderProps) {
        super(props);
        this.state = {
            newsData: []
        };
    }

    render = () => {
        return (
            <NewsPreviewCanvas
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