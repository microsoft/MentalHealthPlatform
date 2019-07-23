// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import * as classes from './dashboard.css';

interface IDashboardProps {
}

const Tile = (props: any) => {
    return (
        <div className={classes.Tile}>
            {props.children}
        </div>
    );
}

const Dashboard = (props: IDashboardProps) => {
    const {
    } = props;

    return (
        <div className={classes.DashboardContainer}>
            <div className={classes.RowA}>
                <div className={classes.ColA}>
                    <Tile>Resources</Tile>
                </div>
                <div className={classes.ColB}>
                    <Tile>Crisis</Tile>
                </div>
                <div className={classes.ColC}>
                    <Tile>Statistics</Tile>
                </div>
            </div>
            <div className={classes.RowB}>
                <div className={classes.ColA}>
                    <div className={classes.RowA}>
                        <Tile>Latest news</Tile>
                    </div>
                    <div className={classes.RowA}>
                        <Tile>Therapist</Tile>
                    </div>
                </div>
                <div className={classes.ColB}>
                    <div className={classes.RowA}>
                        <Tile>Trending posts</Tile>
                    </div>
                </div>
                <div className={classes.ColC}>
                    <div className={classes.RowA}>
                        <Tile>Trending keywords</Tile>
                    </div>
                    <div className={classes.RowA}>
                        <Tile>Upcoming events</Tile>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;