// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import * as classes from "./news-preview.css";
import { INewsData } from './../News/news-provider';
import { getShortenedTimeAndDate } from './../../util/Helpers';
import DashboardTile from './../DashboardTile/dashboard-tile';
import localization from '../../res/strings/localization';

// TODO: Remove hardcoded images
import headspace from './../../images/headspace.png';

interface INewsPreviewProps {
    newsData: INewsData[];
    isLoading: boolean
}

const NUMBER_OF_NEWS_PREVIEWS = 1;

const renderNewsPreview = (newsData: INewsData, key: number) => {
    return (
        <div className={classes.NewsDataContainer}>
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
    const news = [];
    for (let i = 0; i < Math.min(NUMBER_OF_NEWS_PREVIEWS, newsData.length); i++) {
        news.push(renderNewsPreview(newsData[i], i));
    }
    return news;
}

const NewsPreview = (props: INewsPreviewProps) => {
    const {
        newsData,
        isLoading
    } = props;
    
    return (
        <DashboardTile
            buttonProps={{
                link: `/news`,
                label: localization.getLocalizedString("DASHBOARD_PREVIEW_NEWS_BUTTON"),
                isBlueBackground: false,
                isCentered: false
            }}
            header={localization.getLocalizedString("DASHBOARD_PREVIEW_NEWS_HEADER")}
            isLoading={isLoading}
        >
            {renderAllNewsPreview(newsData)}
        </DashboardTile>
    );
};

export default NewsPreview;