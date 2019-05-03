// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from "react";

import * as classes from "./topic.css";

export interface ITopicProps {
    name: string;
    image: string;
    title: string;
}

const Topic = (props: ITopicProps): JSX.Element => {
    return (
        <div className={classes.TopicTile}>
            <p 
                className={classes.Image}
                style={{
                    backgroundImage: `url(${props.image})`,
                    backgroundSize: "cover"
                }}>{props.title}</p>
        </div>
    )
};

export default Topic;