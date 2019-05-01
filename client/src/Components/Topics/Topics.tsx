// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { Link, withRouter, RouteComponentProps, match } from 'react-router-dom';

import {TopicsSearchBar} from './TopicsSearchBar';
import * as classes from "./Topics.css";
import { BASE_URL } from '../../util/Helpers';
import {Topic} from "./Topic/Topic";

import topic_image_0 from "../../images/topic_image_0.jpg";
import topic_image_1 from "../../images/topic_image_1.jpg";
import topic_image_2 from "../../images/topic_image_2.jpg";
import topic_image_3 from "../../images/topic_image_3.jpg";

export interface ITopicsState {
    match: match<{}>;
    searchString: string;
    topicsData: any;
}

class TopicsClass extends React.Component<RouteComponentProps<{}>, ITopicsState> {
    constructor(props) {
        super(props);
        this.state = {
            match: this.props.match,
            searchString: undefined,
            topicsData: undefined
        };
    }

    /**
     * Temporary function that generates stub topics data
     * @return  {any}   Stub topics data
     */
    generateData = () => {
        const topics = [];
        for (let i = 0; i < 8; i++) {
            const topic = {
                titleTitle: "Topic " + i                
            };
            topics.push(topic);
        };
        return topics;
    }

    updateSearchString = (searchString) => {
        this.setState({searchString});
    }
    /**
     * Renders topics component including search bar and topics table
     * @return  {React.Component}   Rendered component
     */
    render = () => {
        let baseUrl = this.state.match.url;
        if (baseUrl.charAt(baseUrl.length - 1) == '/') {
            baseUrl = baseUrl.substring(0, baseUrl.length - 1);
        }

        let topicsData = this.state.topicsData; //this.generateData();
        if(topicsData !== undefined && this.state.searchString !== undefined){
            topicsData = topicsData.filter((data) => {
                return data.topicTitle && data.topicTitle.toLowerCase().indexOf(this.state.searchString.toLowerCase()) !== -1;
            });
        }
        const images = [topic_image_0, topic_image_1, topic_image_2, topic_image_3];
        let tiles;
        if(topicsData != undefined){
            tiles = topicsData.map((topic, index) => {
                return (
                    <Link key={index} to={`${baseUrl}/topic${index}`}>
                        <Topic name={"jksbvjv"} title={topic.topicTitle} image={images[index%images.length]} />
                    </Link>
                );
            });
        }

        return (
            <div>
                <div className={classes.Background}></div>
                <div className={classes.Container}>
                    <TopicsSearchBar inputChanged={this.updateSearchString}/>
                    <div className={classes.TileContainer}>{tiles}</div>
                </div>
            </div>
        );
    }

    componentDidMount = () => {
        const _this = this;
        fetch(`${BASE_URL}/gettopics`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(function(response) {
            const output = response.json();
            return output;
        }).then(function(data) {
            _this.setState({
                topicsData: data
            });
        });
    }
}

export const Topics = withRouter(TopicsClass);