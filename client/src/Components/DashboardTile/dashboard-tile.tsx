// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import { IDashboardTileButtonProps, DashboardTileButton } from './../DashboardTileButton/dashboard-tile-button';
import * as classes from './dashboard-tile.css';
import LoadingBubbles from './../LoadingBubbles/loading-bubbles';

interface IDashboardTileProps {
    children: any,
    header: string,
    buttonProps?: IDashboardTileButtonProps,
    isLoading?: boolean
}

const renderButton = (buttonProps: IDashboardTileButtonProps) => {
    if (!buttonProps) {
        return null;
    }
    return (
        <div className={classes.DashboardTileButtonFlexbox}>
            <DashboardTileButton link={buttonProps.link} label={buttonProps.label} isBlueBackground={buttonProps.isBlueBackground} isCentered={buttonProps.isCentered} />
        </div>
    );
}

const DashboardTile = (props: IDashboardTileProps) => {
    const {
        children,
        buttonProps,
        header,
        isLoading
    } = props;

    return (
        <div className={classes.DashboardTileContainer}>
            <div className={classes.DashboardTileHeader}>{header}</div>
            {isLoading ? <LoadingBubbles isLoading={true} bubblesWidth={60} bubblesHeight={60} /> : children}
            {renderButton(buttonProps)}
        </div>
    );
};

export default DashboardTile;