// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from "react";

import * as classes from "./topic.css";

export interface ITopicProps {
    image: string;
    title: string;
}

const Topic = (props: ITopicProps): JSX.Element => {
    const { image, title } = props;

    return (
        <div className={classes.TopicTile}>
            <p className={classes.Image}
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover"
                }}>{title}</p>
        </div>
    )
};

export default Topic;