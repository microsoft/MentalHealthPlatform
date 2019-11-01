// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import * as classes from "./news.css";
import { INewsData } from './news-provider';
import { getShortenedTimeAndDate } from './../../util/Helpers';
import { LocalizationContext } from './../LocalizationProvider';
import LoadingBubbles from './../LoadingBubbles/loading-bubbles';

// TODO: Remove hardcoded images
import satya_nadella from './../../images/satya_nadella.jpg'
import headspace from './../../images/headspace.png'

interface IContactsProps {
    newsData: INewsData[],
    isLoading: boolean;
}

const renderNews = (newsData: INewsData, key: number) => {
    return (
        <div className={classes.NewsContainer} key={key}>
            <div className={classes.ImageContainer}>
                <img src={newsData.title.indexOf("Executive") >= 0 ? satya_nadella : headspace} className={classes.Image} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: 20 }}>
                <h2 className={classes.Title}>{newsData.title}</h2>
                <div>{getShortenedTimeAndDate(new Date(newsData.date))}</div>
                <div className={classes.Description}>{newsData.desc}</div>
            </div>
        </div>
    );
};

const News = (props: IContactsProps) => {
    const { newsData, isLoading } = props;
    const { getLocalizedString } = React.useContext(LocalizationContext);

    const news = newsData.map((currentNewsData, i) => renderNews(currentNewsData, i));

    return (
        <div className={classes.Container}>
            <h1 className={classes.Header}>{getLocalizedString("NEWS_HEADER")}</h1>
            {isLoading ? <LoadingBubbles isLoading={true} bubblesWidth={60} bubblesHeight={60} /> : news}
        </div>  
    );
};

export default News;