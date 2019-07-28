// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import ReactLoading from 'react-loading';
import headspace from './../../images/headspace.png';
import { Header } from './../Dashboard/dashboard.css';
import * as classes from "./news-preview.css";
import { INewsData } from './../News/news-provider';
import { getShortenedTimeAndDate } from './../../util/Helpers';
import DashboardTileButton from './../DashboardTileButton/dashboard-tile-button';

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
}

const NewsPreview = (props: INewsPreviewProps) => {
    const {
        newsData,
        isLoading
    } = props;

    const news = [];
    for (let i = 0; i < Math.min(NUMBER_OF_NEWS_PREVIEWS, newsData.length); i++) {
        news.push(renderNewsPreview(newsData[i], i));
    }

    return isLoading ? (
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
            <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <div className={Header}>Latest News</div>
                <div className={classes.Loading}>
                    <ReactLoading type="bubbles" color="rgb(13, 103, 151)" height={60} width={60} />
                </div>
            </div>
        </div>
    ) : (
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
            <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <div className={Header}>Latest News</div>
                {news}
            </div>
            <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "flex-end", alignItems: "flex-end" }}>
                <DashboardTileButton link={`/news`} label={`View all latest news \u2192`} isBlueBackground={false} />
            </div>
        </div>
    );
};

export default NewsPreview;