// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from "react";

import { baseGetRequest } from "./../../util/base-requests";
import TrendingKeywordsCanvas from './trending-keywords-preview-canvas';

export interface IKeywordPreviewData {
    word: string;
    count: number;
};

interface ITrendingKeywordsProviderProps {
}

interface ITrendingKeywordsProviderState {
    keywordsData: IKeywordPreviewData[],
    isLoading: boolean;
}

export class TrendingKeywordsProvider extends React.Component<ITrendingKeywordsProviderProps, ITrendingKeywordsProviderState> {
    constructor(props: ITrendingKeywordsProviderProps) {
        super(props);
        this.state = {
            keywordsData: [],
            isLoading: true
        };
    }

    /**
     * Renders forum component
     * @return  {React.Component}   Rendered component
     */
    render = () => {
        return (
            <TrendingKeywordsCanvas
                keywordsData={this.state.keywordsData}
                isLoading={this.state.isLoading}
            />
        );
    }

    componentDidMount = () => {
        this.retrieveTrendingKeywords();
    }

    retrieveTrendingKeywordsResponseHandler = (data: any) => {
        this.setState({
            keywordsData: data && data.trendingKeywords,
            isLoading: false
        });
    }

    retrieveTrendingKeywordsErrorHandler = (error: any) => {
        console.error(error);
        this.setState({
            isLoading: false
        })
    }

    retrieveTrendingKeywords = () => {
        const params = [{}];
        baseGetRequest("gettrendingkeywords", params, this.retrieveTrendingKeywordsResponseHandler, this.retrieveTrendingKeywordsErrorHandler);
    }
}