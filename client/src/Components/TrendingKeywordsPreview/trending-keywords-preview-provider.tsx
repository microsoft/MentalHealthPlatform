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
    keywordsData: IKeywordPreviewData[]
}

export class TrendingKeywordsProvider extends React.Component<ITrendingKeywordsProviderProps, ITrendingKeywordsProviderState> {
    constructor(props: ITrendingKeywordsProviderProps) {
        super(props);
        this.state = {
            keywordsData: []
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
            />
        );
    }

    componentDidMount = () => {
        this.retrieveTrendingKeywords();
    }

    retrieveTrendingKeywordsResponseHandler = (data: any) => {
        this.setState({
            keywordsData: data && data.trendingKeywords
        });
    }

    retrieveTrendingKeywordsErrorHandler = (error: any) => {
        console.error(error);
    }

    retrieveTrendingKeywords = () => {
        const params = [{}];
        baseGetRequest("gettrendingkeywords", params, this.retrieveTrendingKeywordsResponseHandler, this.retrieveTrendingKeywordsErrorHandler);
    }
}