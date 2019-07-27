// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import facebook_icon from './../../images/facebook_icon.png';
import outlook_icon from './../../images/outlook_icon.png';
import twitter_icon from './../../images/twitter_icon.png';
import * as classes from './statistics-preview.css'
import { Header } from './../Dashboard/dashboard.css';
import { Link } from 'react-router-dom';

interface IStatisticsPreviewProps {
}

interface IStatisticData {
    src: string;
    label: string;
    hours: number;
}

const statisticsData = [
    {
        src: outlook_icon,
        label: "Outlook",
        hours: 10.2
    },
    {
        src: facebook_icon,
        label: "Facebook",
        hours: 5.0
    },
    {
        src: twitter_icon,
        label: "Twitter",
        hours: 2.1
    }
];

const renderStatistic = (statisticData: IStatisticData, key: number) => {
    const hours = statisticData.hours;
    return (
        <tr key={key}>
            <td className={classes.TableCell}><img src={statisticData.src} className={classes.StatisticsPreviewImage} /></td>
            <td className={classes.TableCell} style={{ fontWeight: "bold" }}>{statisticData.label}</td>
            <td className={classes.TableCell}>{`${hours} ${hours === 1 ? "hour" : "hours"}`}</td>
        </tr>
    );
}

const StatisticsPreview = (props: IStatisticsPreviewProps) => {
    const {
    } = props;

    const statistics = [];
    for (let i = 0; i < statisticsData.length; i++) {
        statistics.push(renderStatistic(statisticsData[i], i));
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div className={Header}>Your statistics this week</div>
            <div>
                <table>
                    <tbody>
                        {statistics}
                    </tbody>
                </table>
            </div>
            <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <Link to={`/events`} style={{ textDecoration:"none", display: "flex", flexGrow: 1 }}>
                    <div className={classes.ButtonContainer}>
                        <button className={classes.Button}>View statistics &rarr;</button>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default StatisticsPreview;