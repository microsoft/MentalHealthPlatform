// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import * as classes from "./news.css";
import { INewsData } from './news-provider';
import { getShortenedTimeAndDate } from './../../util/Helpers';

interface IContactsProps {
    newsData: INewsData[]
}

const renderNews = (newsData: INewsData, key: number) => {
    return (
        <div className={classes.NewsContainer} key={key}>
            <h2 className={classes.Title}>{newsData.title}</h2>
            <div className={classes.Date}>{getShortenedTimeAndDate(new Date(newsData.date))}</div>
            <div className={classes.Description}>{newsData.desc}</div>
        </div>
    );
};

const News = (props: IContactsProps) => {
    const {
        newsData
    } = props;

    const news = [];
    for (let i = 0; i < newsData.length; i++) {
        news.push(renderNews(newsData[i], i));
    }

    return (
        <div className={classes.Container}>
            <h1 className={classes.Header}>Latest News</h1>
            {news}
        </div>  
    );
};

export default News;