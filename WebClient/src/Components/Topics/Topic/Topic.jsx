import React from "react";
import classes from "./Topic.css";

export const Topic = (props) => {

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