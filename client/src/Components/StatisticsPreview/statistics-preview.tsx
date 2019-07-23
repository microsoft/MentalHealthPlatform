// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import facebook_icon from './../../images/facebook_icon.png';
import outlook_icon from './../../images/outlook_icon.png';
import twitter_icon from './../../images/twitter_icon.png';
import * as classes from './statistics-preview.css'
interface IStatisticsPreviewProps {
}

const StatisticsPreview = (props: IStatisticsPreviewProps) => {
    const {
    } = props;

    return (
        <div>
            <h3>Your statistics this week</h3>
            <div className={classes.StatisticsPreviewApp}>
                <img src={outlook_icon} className={classes.StatisticsPreviewImage} />
                <label className={classes.StatisticsPreviewLabels}>Outlook</label>
                <label className={classes.StatisticsPreviewLabels}>10.2 hours</label>
            </div>
            <div className={classes.StatisticsPreviewApp}>
                <img src={facebook_icon} className={classes.StatisticsPreviewImage} />
                <label className={classes.StatisticsPreviewLabels}>Facebook</label>
                <label className={classes.StatisticsPreviewLabels}>5.0 hours</label>
            </div>
            <div className={classes.StatisticsPreviewApp}>
                <img src={twitter_icon} className={classes.StatisticsPreviewImage} />
                <label className={classes.StatisticsPreviewLabels}>Twitter</label>
                <label className={classes.StatisticsPreviewLabels}>2.1 hours</label>
            </div>
            
        </div>
    );
};

export default StatisticsPreview;