// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

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
        word: "Depressed",
        count: 15
    },
    {
        word: "tired",
        count: 5
    }
];

const getFontSizeIncrement = (i: number) => {
    const incrementBase = (50 - 10) / trendingKeywords.length;
    let increment = (incrementBase) * (i + 1);
    if (increment < 10)
    {
        increment = 10;
    }
    return increment;
};


const TrendingKeywordsPreview = (props: ITrendingKeywordsPreviewProps) => {
    const {
    } = props;

    const keywords = [];
    for (let i = 0; i < trendingKeywords.length; i++)
    {
        const fontSize = getFontSizeIncrement(i);
        keywords.push(
            <label style={{fontSize:fontSize}} className={classes.TrendingKeywordsPreviewWords}>
                {trendingKeywords[i].word}
            </label>
        );
    }

    return (
        <div>
            <h3>Trending Keywords</h3>
            <div >
                {keywords}
            </div>
        </div>
    );
};

export default TrendingKeywordsPreview;