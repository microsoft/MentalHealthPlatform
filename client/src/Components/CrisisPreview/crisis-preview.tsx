// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import phone from './../../images/phone.jpg';
import online_support from './../../images/online_support.jpg';

import * as classes from "./crisis-preview.css";

interface ICrisisPreviewProps {
}

const CrisisPreview = (props: ICrisisPreviewProps) => {
    const {
    } = props;

    return (
        <div className={classes.CrisisPreviewsOverallContainer}>
            <div>
                <label className={classes.CrisisPreviewsText}>
                    Are you currently experiencing a crisis?
                </label>
            </div>
            <div className={classes.CrisisPreviews}>
                <div className={classes.CrisisPreviewsSupportContainer}>
                    <div className={classes.CrisisPreviewSupportContainer}>
                        <img src={phone} className={classes.CrisisPreviewImage}/>
                        <label>Phone</label>
                    </div>
                    <div className={classes.CrisisPreviewSupportContainer}>
                        <img src={online_support} className={classes.CrisisPreviewImage}/>
                        <label>Online</label>
                    </div>  
                </div>
                
                <div className={classes.CrisisPreviewsButtonContainer}>
                    <button className={classes.CrisisPreviewsButton}>Get help now</button>
                </div>
            </div>
            
        </div>
    );
};

export default CrisisPreview;