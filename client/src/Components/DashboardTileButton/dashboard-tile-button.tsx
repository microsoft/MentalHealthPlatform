// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { Link } from 'react-router-dom';

import * as classes from './dashboard-tile-button.css';

interface IDashboardTileButtonProps {
    label: string,
    link: string,
    isBlueBackground: boolean
}

const DashboardTileButton = (props: IDashboardTileButtonProps) => {
    const {
        label,
        link,
        isBlueBackground
    } = props;

    const backgroundClass = isBlueBackground ? classes.DashboardTileButton_BlueBackground : classes.DashboardTileButton_WhiteBackground;
    const textAlign = isBlueBackground ? classes.TextAlignCenter : classes.TextAlignEnd;
    const buttonClass = [classes.DashboardTileButton, backgroundClass, textAlign].join(' ');

    return (
        <Link to={link} className={classes.DashboardTileButtonLink}>
            <div className={classes.DashboardTileButtonWrapper}>
                <button className={buttonClass}>{label}</button>
            </div>
        </Link>
    );
};

export default DashboardTileButton;