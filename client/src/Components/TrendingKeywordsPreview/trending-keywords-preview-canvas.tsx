// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { Header } from './../Dashboard/dashboard.css';
import * as classes from "./trending-keywords-preview.css";
import { IKeywordPreviewData } from "./trending-keywords-preview-provider";

interface ITrendingKeywordsPreviewProps {
    keywordsData: IKeywordPreviewData[];
}

const getFontSizeIncrement = (count: number, maxCount: number, minCount: number) => {
    const MAX_SIZE = 30;
    const MIN_SIZE = 20;
    const percentage = (count - minCount) / (maxCount - minCount);
    const size = (percentage * (MAX_SIZE - MIN_SIZE)) + MIN_SIZE;
    return size + "px";
};

const TrendingKeywordsPreview = (props: ITrendingKeywordsPreviewProps) => {
    const {
        keywordsData
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

    return (
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