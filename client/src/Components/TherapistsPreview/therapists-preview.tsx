// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import * as classes from "./therapists-preview.css";

interface ITherapistsPreviewProps {
}

const TherapistsPreview = (props: ITherapistsPreviewProps) => {
    const {
    } = props;

    return (
        <div className={classes.TherapistsPreviewContainer}>
            <h3>Find a therapist in your area</h3>
            <label>You are eligible for 10 free therapy sessions per year.
                Take advantage of this opportunity by finding a therapist from
                our list of certified professionals.
            </label>
            <div className={classes.TherapistsPreviewButtonContainer}>
                <button className={classes.TherapistsPreviewButton}>Talk to someone</button>
            </div>
        </div>
    );
};

export default TherapistsPreview;