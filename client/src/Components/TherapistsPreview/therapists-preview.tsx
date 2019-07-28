// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import DashboardTile from './../DashboardTile/dashboard-tile';

const TherapistsPreview = () => {
    return (
        <DashboardTile
            buttonProps={{
                link: `/therapists`,
                label: `Talk to someone \u2192`,
                isBlueBackground: true,
                isCentered: true
            }}
            header={"Find a therapist in your area"}
        >
            <label>You are eligible for 10 free therapy sessions per year. Take advantage of this opportunity by finding a therapist from our list of certified professionals.</label>
        </DashboardTile>
    );
};

export default TherapistsPreview;