// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import satya_nadella from './../../images/satya_nadella.jpg';
import headspace from './../../images/headspace.png';

import * as classes from "./news-preview.css";

interface INewsPreviewProps {
}

interface INewsData {
    date: string;
    title: string;
    description: string;
    picture: string;
}

const newsData = [
    {
        date: "July 22, 2019",
        title: "New headspace partnership!",
        description: "Employees now get 20% off any Headspace membership. Come get your discount now!", 
        picture: headspace
    },
    {
        date: "July 21, 2019",
        title: "Executive discussion",
        description: "Satya Nadella sits down to discuss about the importance of mental health",
        picture: satya_nadella
    }
];

const NewsPreview = (props: INewsPreviewProps) => {
    const {
    } = props;

    return (
        <div>
            <h3>Latest News</h3>
            <div className={classes.NewsDataContainer}>
                <img src={newsData[0].picture} className={classes.NewsDataImage}/>
                <div className={classes.NewsDataTextContainer}>
                    <label className={classes.NewsDataTitle}>{newsData[0].title}</label>
                    <label className={classes.NewsDataDate}>{newsData[0].date}</label>
                    <label>{newsData[0].description}</label>
                </div>
            </div>
           
        </div>
    );
};

export default NewsPreview;