import React from "react";
import { Link } from 'react-router-dom';
import Icon from '../../Icon/Icon';
import classes from "./InfoCard.css";

import profilePicturePlaceholder from './../../../images/profile_picture_placeholder.png';

export class InfoCard extends React.Component {
    render() {
        const { data, match } = this.props;
        let baseUrl = match.url;
        if (baseUrl.charAt(baseUrl.length - 1) == '/') {
            baseUrl = baseUrl.substring(0, baseUrl.length - 1);
        }

        return (
            <Link to={`${baseUrl}/chat/${data.chatId}`} style={{textDecoration: "none", color: "#333333"}}>
                <div style={classes.InfoCardContainer}>
                    <div style={{flex: 1}}>
                        <div style={classes.Title}>{data.chatTitle}</div>
                        <div>{data.chatDescription}</div>
                    </div>
                    <div style={{marginLeft: 32, display: "flex", flexDirection: "row"}}>
                        <img src={profilePicturePlaceholder} style={classes.ProfilePicture}/>
                        <div style={{display: "flex", flexDirection: "column", marginLeft: 8}}>
                            <div style={classes.Name}>{data.authorName}</div>
                            <div>{data.date}</div>
                        </div>
                    </div>
                    <div style={{marginLeft: 32}}>
                        <Icon type='replies' number={data.numberOfReplies || '0'} text='replies' />
                        <Icon type='views' number={data.numberOfViews || '0'} text='views' />
                    </div>
                </div>
            </Link>
        )
    }
};