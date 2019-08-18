// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import * as classes from './dashboard.css';
import ResourcesPreview from './../ResourcesPreview/resources-preview';
import NewsPreview from './../NewsPreview/news-preview';
import { NewsPreviewProvider } from './../NewsPreview/news-preview-provider';
import CrisisPreview from './../CrisisPreview/crisis-preview';
import StatisticsPreview from './../StatisticsPreview/statistics-preview';
import TherapistsPreview from './../TherapistsPreview/therapists-preview';
import { TrendingPostsProvider } from '../TrendingPostsPreview/trending-posts-preview-provider';
import { TrendingKeywordsProvider } from './../TrendingKeywordsPreview/trending-keywords-preview-provider';
import { UpcomingEventsPreviewProvider } from './../UpcomingEventsPreview/upcoming-events-preview-provider';

interface IDashboardProps {
}

interface ITileProps {
    children: any;
    isBlue?: boolean;
}

const Tile = (props: ITileProps) => {
    const className = `${classes.Tile} ${props.isBlue ? classes.BlueBackground : classes.WhiteBackground}`;
    return (
        <div className={className}>
            {props.children}
        </div>
    );
}

const Dashboard = (props: IDashboardProps) => {
    const {
    } = props;

    return (
        <div className={classes.DashboardContainer}>
            <div className={classes.RowA}>
                <div className={classes.ColA}>
                    <Tile><ResourcesPreview /></Tile>
                </div>
                <div className={classes.ColB}>
                    <Tile isBlue={true}><CrisisPreview /></Tile>
                </div>
                <div className={classes.ColC}>
                    <Tile><StatisticsPreview /></Tile>
                </div>
            </div>
            <div className={classes.RowB}>
                <div className={classes.ColA}>
                    <div className={classes.RowA}>
                        <Tile><NewsPreviewProvider /></Tile>
                    </div>
                    <div className={classes.RowA}>
                        <Tile><TherapistsPreview /></Tile>
                    </div>
                </div>
                <div className={classes.ColB}>
                    <div className={classes.RowA}>
                        <Tile><TrendingPostsProvider /></Tile>
                    </div>
                </div>
                <div className={classes.ColC}>
                    <div className={classes.RowA}>
                        <Tile><TrendingKeywordsProvider /></Tile>
                    </div>
                    <div className={classes.RowA}>
                        <Tile><UpcomingEventsPreviewProvider /></Tile>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;