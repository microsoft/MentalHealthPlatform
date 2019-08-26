// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import React, { useState, useEffect } from "react";

import { baseGetRequest } from "./../../util/base-requests";
import TrendingKeywordsCanvas from './trending-keywords-preview-canvas';

export interface IKeywordPreviewData {
    word: string;
    count: number;
};

export const TrendingKeywordsProvider = () => {
    const [keywordsData, setKeywordsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const retrieveTrendingKeywordsResponseHandler = (data: any) => {
        setKeywordsData(data && data.trendingKeywords);
        setIsLoading(false);
    }

    const retrieveTrendingKeywordsErrorHandler = (error: any) => {
        console.error(error);
        setIsLoading(false);
    }

    const retrieveTrendingKeywords = () => {
        const params = [{}];
        baseGetRequest("gettrendingkeywords", params, retrieveTrendingKeywordsResponseHandler, retrieveTrendingKeywordsErrorHandler);
    }

    useEffect(() => {
        retrieveTrendingKeywords();
    }, []);

    return (
        <TrendingKeywordsCanvas
            keywordsData={keywordsData}
            isLoading={isLoading}
        />
    );
}