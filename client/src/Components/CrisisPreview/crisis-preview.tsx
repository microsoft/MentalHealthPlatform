// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import phone from './../../images/phone.jpg';
import online_support from './../../images/online_support.jpg';
import { Link } from 'react-router-dom';
import * as classes from "./crisis-preview.css";
import { DashboardTileButton } from './../DashboardTileButton/dashboard-tile-button';

interface ICrisisPreviewProps {
}

const CrisisPreview = (props: ICrisisPreviewProps) => {
    const {
    } = props;

    return (
        <div className={classes.CrisisPreviewsOverallContainer}>
            <div style={{ display: "flex", flexGrow: 1 }}>
                <label className={classes.CrisisPreviewsText}>
                    Are you currently experiencing a crisis?
                </label>
            </div>
            <div className={classes.CrisisPreviews}>
                <div className={classes.CrisisPreviewsSupportContainer}>
                    <div className={classes.CrisisPreviewSupportContainer}>
                        <img src={phone} className={classes.CrisisPreviewImage}/>
                        <label className={classes.CrisisPreviewSupportText}>Phone</label>
                    </div>
                    <div className={classes.CrisisPreviewSupportContainer}>
                        <img src={online_support} className={classes.CrisisPreviewImage}/>
                        <label className={classes.CrisisPreviewSupportText}>Online</label>
                    </div>  
                </div>
                <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "flex-end", alignItems: "flex-end" }}>
                    <DashboardTileButton link={`/crisis`} label={`Get help now \u2192`} isBlueBackground={false} isCentered={true} />
                </div>
            </div>
        </div>
    );
};

export default CrisisPreview;