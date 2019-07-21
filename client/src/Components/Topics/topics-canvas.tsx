// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { Link, match } from 'react-router-dom';

import { ITopicData } from "./topics-provider";
import TopicsSearchBar from '../TopicsSearchBar/topics-search-bar';
import * as classes from "./Topics.css";
import Topic from "../Topic/topic";

import topic_image_0 from "../../images/topic_image_0.jpg";
import topic_image_1 from "../../images/topic_image_1.jpg";
import topic_image_2 from "../../images/topic_image_2.jpg";
import topic_image_3 from "../../images/topic_image_3.jpg";

interface ITopicsCanvasProps {
    match: match<{}>;
    searchString: string;
    topicsData: ITopicData[];
    updateSearchString: (searchString: string) => void;
}

const TopicsCanvas = (props: ITopicsCanvasProps) => {
    const {
        match,
        searchString,
        topicsData,
        updateSearchString
    } = props;

    const images = [topic_image_0, topic_image_1, topic_image_2, topic_image_3];
    
    let baseUrl = match.url;
    if (baseUrl.charAt(baseUrl.length - 1) == '/') {
        baseUrl = baseUrl.substring(0, baseUrl.length - 1);
    }

    let newTopicsData = topicsData;
    if(newTopicsData !== undefined && searchString !== undefined){
        newTopicsData = newTopicsData.filter((data) => {
            return data.topicTitle && data.topicTitle.toLowerCase().indexOf(searchString.toLowerCase()) !== -1;
        });
    }
    
    let tiles;
    if (newTopicsData != undefined){
        tiles = newTopicsData.map((topic, index: number) => {
            return (
                <Link key={index} to={`${baseUrl}/topic${topic._id}`}>
                    <Topic name={"jksbvjv"} title={topic.topicTitle} image={images[index%images.length]} />
                </Link>
            );
        });
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div className={classes.Container}>
                <TopicsSearchBar inputChanged={updateSearchString}/>
                <div className={classes.TileContainer}>{tiles}</div>
            </div>
        </div>
    );
};

export default TopicsCanvas;