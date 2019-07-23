// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { Link } from 'react-router-dom';
import image0 from './../../images/topic_image_0.jpg';
import image1 from './../../images/topic_image_1.jpg';
import image2 from './../../images/topic_image_2.jpg';
import image3 from './../../images/topic_image_3.jpg';
import * as classes from "./resources-preview.css";

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
        src: image1
    },
    {
        label: "Guides",
        src: image2
    },
    {
        label: "Mediation",
        src: image3
    }

];

const renderPreview = (data: IResourcesData) => {
    if (data.pageName)
    {
        return (
            <Link to={`/${data.pageName}`}>
                <div className={classes.ResourcePreviewContainer}>
                    <img src={data.src} className={classes.ResourcePreviewImage} />
                    <label >{data.label}</label>
                </div>
            </Link>
        );
    } 
    return (
        <div className={classes.ResourcePreviewContainer}>
            <img src={data.src} className={classes.ResourcePreviewImage} />
            <label >{data.label}</label>
        </div>
        
    );
};

const ResourcesPreview = (props: IResourcesPreviewProps) => {
    const {
    } = props;

    const previews = [];
    for (let i = 0; i < resourcesData.length; i++)
    {
        previews.push(renderPreview(resourcesData[i]));
    }
    return (
        <div className={classes.ResourcesBox}>
            <h3>Resources</h3>
            
            <div className={classes.ResourcePreviews}>
                {previews}
            </div>
        </div>
    );
};

export default ResourcesPreview;