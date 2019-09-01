// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { Link, match } from 'react-router-dom';

import { ITopicData } from "./topics-provider";
import * as classes from "./Topics.css";
import Topic from "../Topic/topic";
import SearchPage from './../SearchPage/search-page';
import { LocalizationContext } from './../LocalizationProvider';

import topic_image_0 from "../../images/topic_image_0.jpg";
import topic_image_1 from "../../images/topic_image_1.jpg";
import topic_image_2 from "../../images/topic_image_2.jpg";
import topic_image_3 from "../../images/topic_image_3.jpg";
import topic_image_4 from "../../images/topic_image_4.jpg";
import topic_image_5 from "../../images/topic_image_5.jpg";
import topic_image_6 from "../../images/topic_image_6.jpg";
import topic_image_7 from "../../images/topic_image_7.jpg";

interface ITopicsCanvasProps {
    match: match<{}>;
    searchString: string;
    topicsData: ITopicData[];
    loading: boolean;
    updateSearchString: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TopicsCanvas = (props: ITopicsCanvasProps) => {
    const {
        match,
        searchString,
        topicsData,
        updateSearchString,
        loading
    } = props;

    const { getLocalizedString } = React.useContext(LocalizationContext);

    // TODO: Migrate images from client to server
    const images = [topic_image_0, topic_image_1, topic_image_2, topic_image_3, topic_image_4, topic_image_5, topic_image_6, topic_image_7];
    
    let baseUrl = match.url;
    if (baseUrl.charAt(baseUrl.length - 1) === '/') {
        baseUrl = baseUrl.substring(0, baseUrl.length - 1);
    }

    let newTopicsData = topicsData;
    if (newTopicsData !== undefined && searchString !== undefined){
        newTopicsData = newTopicsData.filter((data) => {
            return data.topicTitle && data.topicTitle.toLowerCase().indexOf(searchString.toLowerCase()) !== -1;
        });
    }
    
    let tiles;
    if (newTopicsData !== undefined){
        tiles = newTopicsData.map((topic, index: number) => {
            return (
                <Link key={index} to={`${baseUrl}/topic${topic._id}`}>
                    <Topic title={topic.topicTitle} image={images[parseInt(topic.image) - 1]} />
                </Link>
            );
        });
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div className={classes.Container}>
                <SearchPage
                    loading={loading}
                    centerSearch={true}
                    searchBarProps={{
                        placeholder: getLocalizedString("TOPICS_INPUT_PLACEHOLDER"),
                        query: searchString,
                        handleInputChange: updateSearchString
                    }}
                >
                    <div className={classes.TileContainer}>{tiles}</div>
                </SearchPage>
            </div>
        </div>
    );
};

export default TopicsCanvas;