// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import phone from './../../images/phone.jpg';
import online_support from './../../images/online_support.jpg';
import * as classes from "./crisis-preview.css";
import { DashboardTileButton } from './../DashboardTileButton/dashboard-tile-button';
import { LocalizationContext } from './../LocalizationProvider';

const CrisisPreview = () => {
    const { getLocalizedString } = React.useContext(LocalizationContext);

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
                        <label className={classes.CrisisPreviewSupportText}>{getLocalizedString("DASHBOARD_PREVIEW_CRISIS_PHONE_LABEL")}</label>
                    </div>
                    <div className={classes.CrisisPreviewSupportContainer}>
                        <img src={online_support} className={classes.CrisisPreviewImage}/>
                        <label className={classes.CrisisPreviewSupportText}>{getLocalizedString("DASHBOARD_PREVIEW_CRISIS_ONLINE_LABEL")}</label>
                    </div>  
                </div>
                <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "flex-end", alignItems: "flex-end" }}>
                    <DashboardTileButton link={`/crisis`} label={getLocalizedString("DASHBOARD_PREVIEW_CRISIS_BUTTON")} isBlueBackground={false} isCentered={true} />
                </div>
            </div>
        </div>
    );
};

export default CrisisPreview;