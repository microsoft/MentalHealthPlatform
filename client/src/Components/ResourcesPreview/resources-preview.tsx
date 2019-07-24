// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { Link } from 'react-router-dom';
import image0 from './../../images/topic_image_0.jpg';
import image1 from './../../images/topic_image_1.jpg';
import image2 from './../../images/topic_image_2.jpg';
import image3 from './../../images/topic_image_3.jpg';
import * as classes from "./resources-preview.css";
import { Header } from './../Dashboard/dashboard.css';

interface IResourcesPreviewProps {
}

interface IResourcesData {
    label: string;
    src: any;
    pageName?: string;
}

const resourcesData = [
    {
        label: "Forums",
        src: image0,
        pageName: "topics"
    },
    {
        label: "Contacts",
        src: image1,
        pageName: "contacts"
    },
    {
        label: "News",
        src: image2,
        pageName: "news"
    },
    {
        label: "Events",
        src: image3,
        pageName: "events"
    }

];

const renderPreview = (data: IResourcesData, key: number) => {
    if (data.pageName)
    {
        return (
            <Link key={key} to={`/${data.pageName}`} style={{ textDecoration:"none", marginLeft: 10 }}>
                <div className={classes.ResourcePreviewContainer}>
                    <img src={data.src} className={classes.ResourcePreviewImage} />
                    <label>{data.label}</label>
                </div>
            </Link>
        );
    } 
    return (
        <div key={key} className={classes.ResourcePreviewContainer} style={{ marginLeft: 10 }}>
            <img src={data.src} className={classes.ResourcePreviewImage} />
            <label className={classes.ResourcesPreviewLabel}>{data.label}</label>
        </div>
        
    );
};

const ResourcesPreview = (props: IResourcesPreviewProps) => {
    const {
    } = props;

    const previews = [];
    for (let i = 0; i < resourcesData.length; i++)
    {
        previews.push(renderPreview(resourcesData[i], i));
    }
    return (
        <div className={classes.ResourcesBox}>
            <div className={Header}>Resources</div>
            <div className={classes.ResourcePreviews}>
                {previews}
            </div>
        </div>
    );
};

export default ResourcesPreview;