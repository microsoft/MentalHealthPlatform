import * as React from "react";
import * as classes from "./Topic.css";

export interface ITopicProps {
    name: string;
    image: string;
    title: string;
}

export const Topic: React.SFC<ITopicProps> = (props): JSX.Element => {

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