// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import DashboardTile from './../DashboardTile/dashboard-tile';
import localization from './../../res/strings/localization';

const TherapistsPreview = () => {
    return (
        <DashboardTile
            buttonProps={{
                link: `/therapists`,
                label: localization.getLocalizedString("DASHBOARD_PREVIEW_THERAPISTS_BUTTON"),
                isBlueBackground: true,
                isCentered: true
            }}
            header={localization.getLocalizedString("DASHBOARD_PREVIEW_THERAPISTS_HEADER")}
        >
            <label>You are eligible for 10 free therapy sessions per year. Take advantage of this opportunity by finding a therapist from our list of certified professionals.</label>
        </DashboardTile>
    );
};

export default TherapistsPreview;