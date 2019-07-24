// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { Header } from './../Dashboard/dashboard.css';
import * as classes from "./trending-keywords-preview.css";

interface ITrendingKeywordsPreviewProps {
}

interface ITrendingKeywords {
    word: string;
    count: number;
}

const trendingKeywords = [
    {
        word: "Anxiety",
        count: 20
    },
    {
        word: "Stressed",
        count: 10
    },
    {
        word: "Depressed",
        count: 15
    },
    {
        word: "tired",
        count: 5
    },
    {
        word: "anxious",
        count: 12
    },
    {
        word: "sleepy",
        count: 25
    },
    {
        word: "triggered",
        count: 30
    }
];

const getFontSizeIncrement = (count: number, maxCount: number, minCount: number) => {
    const MAX_SIZE = 30;
    const MIN_SIZE = 5;
    const percentage = count / (maxCount - minCount);
    const size = (percentage * (MAX_SIZE - MIN_SIZE)) + MIN_SIZE;
    return size + "px";
};


const TrendingKeywordsPreview = (props: ITrendingKeywordsPreviewProps) => {
    const {
    } = props;

    const keywords = [];

    let maxCount = Number.MIN_VALUE;
    let minCount = Number.MAX_VALUE;
    for (let i = 0; i < trendingKeywords.length; i++)
    {
        maxCount = Math.max(maxCount, trendingKeywords[i].count);
        minCount = Math.min(minCount, trendingKeywords[i].count);
    }

    for (let i = 0; i < trendingKeywords.length; i++)
    {
        const opacity = (Math.random() * 0.5) + 0.5;
        const degrees = (Math.random() * 20) - 10;
        const fontSize = getFontSizeIncrement(trendingKeywords[i].count, maxCount, minCount);
        keywords.push(
            <label style={{fontSize:fontSize, transform:`rotate(${degrees}deg)`, opacity:opacity}} className={classes.TrendingKeywordsPreviewWords} key={i}>
                {trendingKeywords[i].word}
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