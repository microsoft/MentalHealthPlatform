// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from "react";
import { Link, match } from 'react-router-dom';
import * as classes from "./data-card.css";

type DataCardDataType = {
    url: string;
    title: string;
    subtitle?: string;
    secondarySubtitle?: string;
    rightText?: string;
    rightSubText?: string;
    rightImage?: string;
    description: string;
    footer?: string;
};

interface IDataCardProps {
    key: string;
    match: match<{}>;
    src?: string;
    data?: DataCardDataType;
}

const DataCard = (props: IDataCardProps): JSX.Element => {
    const { data, match, src } = props;
    let baseUrl = match.url;
    if (baseUrl.charAt(baseUrl.length - 1) == '/') {
        baseUrl = baseUrl.substring(0, baseUrl.length - 1);
    }

    return (
        <Link className={classes.DataCardLinkContainer} to={`${baseUrl}/${data.url}`}>
            <div className={classes.ImageContainer}>
                <img src={src} className={classes.Image} />
            </div>
            <div className={classes.DataCardContainer}>
                <div style={{ flex: 1 }}>
                    <div className={classes.Title}>{data.title}</div>
                    {data.subtitle && <div className={classes.Subtitle}>{data.subtitle}</div>}
                    {data.secondarySubtitle && <div className={classes.SecondarySubtitle}>{data.secondarySubtitle}</div>}
                    <div>{data.description}</div>
                    {data.footer && <div className={classes.Footer}>{data.footer}</div>}
                </div>
                {data.rightText && <div style={{ marginLeft: 32, display: "flex", flexDirection: "row" }}>
                    <div style={{ display: "flex", flexDirection: "column", marginLeft: 8, alignItems: "flex-end" }}>
                        <div className={classes.Subtitle}>{data.rightText}</div>
                        {data.rightSubText && <div className={classes.Subtitle}>{data.rightSubText}</div>}
                    </div>
                </div>}
            </div>
        </Link >
    )
}

export default DataCard;