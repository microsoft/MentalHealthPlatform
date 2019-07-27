// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import phone from './../../images/phone.jpg';
import online_support from './../../images/online_support.jpg';
import { Link } from 'react-router-dom';
import * as classes from "./crisis-preview.css";

interface ICrisisPreviewProps {
}

const CrisisPreview = (props: ICrisisPreviewProps) => {
    const {
    } = props;

    return (
        <div className={classes.CrisisPreviewsOverallContainer}>
            <div style={{ display: "flex", flexGrow: 1 }}>
                <label className={classes.CrisisPreviewsText}>
                    Are you currently experiencing a crisis?
                </label>
            </div>
            <div className={classes.CrisisPreviews}>
                <div className={classes.CrisisPreviewsSupportContainer}>
                    <div className={classes.CrisisPreviewSupportContainer}>
                        <img src={phone} className={classes.CrisisPreviewImage}/>
                        <label className={classes.CrisisPreviewSupportText}>Phone</label>
                    </div>
                    <div className={classes.CrisisPreviewSupportContainer}>
                        <img src={online_support} className={classes.CrisisPreviewImage}/>
                        <label className={classes.CrisisPreviewSupportText}>Online</label>
                    </div>  
                </div>
                <Link to={`/crisis`} style={{textDecoration:"none"}}>
                    <div className={classes.CrisisPreviewsButtonContainer}>
                        <button className={classes.CrisisPreviewsButton}>Get help now  &rarr;</button>
                    </div>
                </Link>
               
            </div>
            
        </div>
    );
};

export default CrisisPreview;