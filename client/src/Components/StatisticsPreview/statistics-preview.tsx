// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import facebook_icon from './../../images/facebook_icon.png';
import outlook_icon from './../../images/outlook_icon.png';
import twitter_icon from './../../images/twitter_icon.png';
import * as classes from './statistics-preview.css';
import DashboardTile from './../DashboardTile/dashboard-tile';
import localization from './../../res/strings/localization';

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
            <td className={classes.TableCell}>{`${hours} ${hours === 1 ? localization.getLocalizedString("DASHBOARD_PREVIEW_STATISTICS_HOUR_LABEL") : localization.getLocalizedString("DASHBOARD_PREVIEW_STATISTICS_HOURS_LABEL")}`}</td>
        </tr>
    );
}

const renderAllStatistics = () => {
    const statistics = [];
    for (let i = 0; i < statisticsData.length; i++) {
        statistics.push(renderStatistic(statisticsData[i], i));
    }
    return (
        <div>
            <table>
                <tbody>
                    {statistics}
                </tbody>
            </table>
        </div>
    );
};

const StatisticsPreview = () => {
    return (
        <DashboardTile
            buttonProps={{
                link: `/`,
                label: localization.getLocalizedString("DASHBOARD_PREVIEW_STATISTICS_BUTTON"),
                isBlueBackground: false,
                isCentered: false
            }}
            header={localization.getLocalizedString("DASHBOARD_PREVIEW_STATISTICS_HEADER")}
        >
            {renderAllStatistics()}
        </DashboardTile>
    );
};

export default StatisticsPreview;