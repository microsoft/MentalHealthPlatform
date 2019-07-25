// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { Link } from 'react-router-dom';
import headspace from './../../images/headspace.png';
import { Header } from './../Dashboard/dashboard.css';
import * as classes from "./news-preview.css";
import { INewsData } from './../News/news-provider';
import { getShortenedTimeAndDate } from './../../util/Helpers';

interface INewsPreviewProps {
    newsData: INewsData[];
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
        newsData
    } = props;

    const news = [];
    for (let i = 0; i < Math.min(NUMBER_OF_NEWS_PREVIEWS, newsData.length); i++) {
        news.push(renderNewsPreview(newsData[i], i));
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
            <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <div className={Header}>Latest News</div>
                {news}
            </div>
            <Link to={`/news`} style={{ textDecoration:"none", display: "flex", flexGrow: 1 }}>
                <div className={classes.ButtonContainer}>
                    <button className={classes.Button}>View all latest news &rarr;</button>
                </div>
            </Link>
        </div>
    );
};

export default NewsPreview;