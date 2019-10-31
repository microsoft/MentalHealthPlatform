// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import * as classes from "./news-preview.css";
import { INewsData } from './../News/news-provider';
import { getShortenedTimeAndDate } from './../../util/Helpers';
import DashboardTile from './../DashboardTile/dashboard-tile';
import { LocalizationContext } from './../LocalizationProvider';

// TODO: Remove hardcoded images
import headspace from './../../images/headspace.png';

interface INewsPreviewProps {
    newsData: INewsData[];
    isLoading: boolean
}

const NUMBER_OF_NEWS_PREVIEWS = 1;

const renderNewsPreview = (newsData: INewsData, key: number) => {
    return (
        <div key={key} className={classes.NewsDataContainer}>
            <img src={headspace} className={classes.NewsDataImage}/>
            <div className={classes.NewsDataTextContainer}>
                <label className={classes.NewsDataTitle}>{newsData.title}</label>
                <label className={classes.NewsDataDate}>{getShortenedTimeAndDate(new Date(newsData.date))}</label>
                <label>{newsData.desc}</label>
            </div>
        </div>
    );
};

const renderAllNewsPreview = (newsData: INewsData[]) => {
    const numberOfPreviews = Math.min(NUMBER_OF_NEWS_PREVIEWS, newsData.length);
    return newsData.slice(0, numberOfPreviews).map((currentNewsData, i) => renderNewsPreview(currentNewsData, i));
}

const NewsPreview = (props: INewsPreviewProps) => {
    const { newsData, isLoading } = props;
    const { getLocalizedString } = React.useContext(LocalizationContext);
    
    return (
        <DashboardTile
            buttonProps={{
                link: `/news`,
                label: getLocalizedString("DASHBOARD_PREVIEW_NEWS_BUTTON"),
                isBlueBackground: false,
                isCentered: false
            }}
            header={getLocalizedString("DASHBOARD_PREVIEW_NEWS_HEADER")}
            isLoading={isLoading}
        >
            {renderAllNewsPreview(newsData)}
        </DashboardTile>
    );
};

export default NewsPreview;