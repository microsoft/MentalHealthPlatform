// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { Header } from './../Dashboard/dashboard.css';
import * as classes from "./therapists-preview.css";
import DashboardTileButton from './../DashboardTileButton/dashboard-tile-button';

interface ITherapistsPreviewProps {
}

const TherapistsPreview = (props: ITherapistsPreviewProps) => {
    const {
    } = props;

    return (
        <div className={classes.TherapistsPreviewContainer}>
            <div className={Header}>Find a therapist in your area</div>
            <label>You are eligible for 10 free therapy sessions per year.
                Take advantage of this opportunity by finding a therapist from
                our list of certified professionals.
            </label>
            <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "flex-end", alignItems: "flex-end" }}>
                <DashboardTileButton link={`/therapists`} label={`Talk to someone \u2192`} isBlueBackground={true} />
            </div>
        </div>
    );
};

export default TherapistsPreview;