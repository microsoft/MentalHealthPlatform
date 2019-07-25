// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import ReactLoading from 'react-loading';
import { Header } from './../Dashboard/dashboard.css';
import * as classes from "./trending-keywords-preview.css";
import { IKeywordPreviewData } from "./trending-keywords-preview-provider";

interface ITrendingKeywordsPreviewProps {
    keywordsData: IKeywordPreviewData[];
    isLoading: boolean;
}

const getFontSizeIncrement = (count: number, maxCount: number, minCount: number) => {
    const MAX_SIZE = 30;
    const MIN_SIZE = 20;
    const denominator = maxCount - minCount;
    const percentage = denominator === 0 ? 1 : (count - minCount) / denominator;
    const size = (percentage * (MAX_SIZE - MIN_SIZE)) + MIN_SIZE;
    return size + "px";
};

const TrendingKeywordsPreview = (props: ITrendingKeywordsPreviewProps) => {
    const {
        keywordsData,
        isLoading
    } = props;

    const keywords = [];

    let maxCount = Number.MIN_VALUE;
    let minCount = Number.MAX_VALUE;
    for (let i = 0; i < keywordsData.length; i++)
    {
        maxCount = Math.max(maxCount, keywordsData[i].count);
        minCount = Math.min(minCount, keywordsData[i].count);
    }

    for (let i = 0; i < keywordsData.length; i++)
    {
        const opacity = (Math.random() * 0.5) + 0.5;
        const degrees = (Math.random() * 20) - 10;
        const fontSize = getFontSizeIncrement(keywordsData[i].count, maxCount, minCount);
        keywords.push(
            <label style={{fontSize:fontSize, transform:`rotate(${degrees}deg)`, opacity:opacity}} className={classes.TrendingKeywordsPreviewWords} key={i}>
                {keywordsData[i].word}
            </label>
        );
    }

    return isLoading ? (
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
            <div className={Header}>Trending Keywords</div>
            <div className={classes.TrendingKeywordsWordsContainer}>
                <div className={classes.Loading}>
                    <ReactLoading type="bubbles" color="rgb(13, 103, 151)" height={80} width={80} />
                </div>
            </div>
        </div>       
        ) : (
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
            <div className={Header}>Trending Keywords</div>
            <div className={classes.TrendingKeywordsWordsContainer}>
                <div className={classes.TrendingKeywordsWords}>
                    {keywords}
                </div>
            </div>
        </div>
    );
};

export default TrendingKeywordsPreview;