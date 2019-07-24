// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { Header } from './../Dashboard/dashboard.css';
import * as classes from "./therapists-preview.css";
import { Link } from 'react-router-dom';

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
            <Link to={`/therapists`} style={{textDecoration:"none"}}>
                <div className={classes.TherapistsPreviewButtonContainer}>
                    <button className={classes.TherapistsPreviewButton}>Talk to someone</button>
                </div>
            </Link>
            

        </div>
    );
};

export default TherapistsPreview;