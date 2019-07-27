// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import * as classes from './crisis.css';

interface ICrsisProps {
}

const Crsis = (props: ICrsisProps) => {
    const {
    } = props;

    return (
        <div className={classes.CrisisContainer}>
            <div className={classes.CrisisWrapper}>
                <div className={classes.LeftPane}>
                    <div className={classes.Label1}>I would like to speak with a therapist on the phone</div>
                    <div className={classes.Label2}>Our professional therapists are available 24/7</div>
                    <div className={classes.Label3}>1 (800) 206-4250</div>
                </div>
                <div className={classes.RightPane}>
                    <div className={classes.Label1}>I would like to message a therapist online</div>
                    <div className={classes.Label2}>Online messaging services open Monday to Friday 8 am to 5 pm</div>
                    <div className={classes.TalkButtonContainer}>
                        <div className={classes.TalkButton}>Talk to someone  &rarr;</div>
                    </div>
                </div>
            </div>
            <div className={classes.Warning}>If you are experiencing a medical emergency, please call 9-1-1</div>
        </div>
    );
};

export default Crsis;