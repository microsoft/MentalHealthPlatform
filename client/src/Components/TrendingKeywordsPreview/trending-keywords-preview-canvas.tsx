// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import * as classes from "./trending-keywords-preview.css";
import DashboardTile from './../DashboardTile/dashboard-tile';
import { IKeywordPreviewData } from "./trending-keywords-preview-provider";
import { LocalizationContext } from './../LocalizationProvider';

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

const renderKeywords = (keywordsData: IKeywordPreviewData[]) => {
    let maxCount = Number.MIN_VALUE;
    let minCount = Number.MAX_VALUE;

    for (const word of keywordsData) {
        maxCount = Math.max(maxCount, word.count);
        minCount = Math.min(minCount, word.count);
    }

    const keywords = keywordsData.map((data, i) => {
        const opacity = Math.random() * 0.5 + 0.5;
        const degrees = Math.random() * 20 - 10;
        const fontSize = getFontSizeIncrement(data.count, maxCount, minCount);

        return (
            <label style={{fontSize:fontSize, transform:`rotate(${degrees}deg)`, opacity:opacity}} className={classes.TrendingKeywordsPreviewWords} key={i}>
                {data.word}
            </label>
        );
    });

    return (
        <div className={classes.TrendingKeywordsWordsContainer}>
            <div className={classes.TrendingKeywordsWords}>
                {keywords}
            </div>
        </div>
    );
}

const TrendingKeywordsPreview = (props: ITrendingKeywordsPreviewProps) => {
    const { keywordsData, isLoading } = props;

    const { getLocalizedString } = React.useContext(LocalizationContext);

    return (
        <DashboardTile
            header={getLocalizedString("DASHBOARD_PREVIEW_TRENDING_KEYWORDS_HEADER")}
            isLoading={isLoading}
        >
            {renderKeywords(keywordsData)}
        </DashboardTile>
    );
};

export default TrendingKeywordsPreview;