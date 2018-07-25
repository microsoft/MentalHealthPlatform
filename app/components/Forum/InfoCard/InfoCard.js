import React from "react";
import { BrowserRouter, Route, Link, IndexRoute, hashHistory, browserHistory, withRouter } from 'react-router-dom';
import { InfoCardStyles } from "./InfoCardStyles";

import profilePicturePlaceholder from './../../../images/profile_picture_placeholder.png';
import messageIcon from './../../../images/message_icon.png';
import viewIcon from './../../../images/view_icon.png';

export class InfoCard extends React.Component {
    render() {
        const { data, match } = this.props;
        let baseUrl = match.url;
        if (baseUrl.charAt(baseUrl.length - 1) == '/') {
            baseUrl = baseUrl.substring(0, baseUrl.length - 1);
        }

        return (
            <Link to={`${baseUrl}/chat/${data.chatId}`} style={{textDecoration: "none", color: "#333333"}}>
                <div style={InfoCardStyles.infoCardContainer}>
                    <div style={{flex: 1}}>
                        <div style={InfoCardStyles.titleStyle}>{data.chatTitle}</div>
                        <div>{data.chatDescription}</div>
                    </div>
                    <div style={{marginLeft: 32, display: "flex", flexDirection: "row"}}>
                        <img src={profilePicturePlaceholder} style={InfoCardStyles.profilePictureStyle}/>
                        <div style={{display: "flex", flexDirection: "column", marginLeft: 8}}>
                            <div style={InfoCardStyles.nameStyle}>{data.authorName}</div>
                            <div>{data.date}</div>
                        </div>
                    </div>
                    <div style={{marginLeft: 32}}>
                        <div style={InfoCardStyles.iconDetailsContainer}>
                            <img src={messageIcon} style={InfoCardStyles.iconStyle}/>
                            <div style={{marginBottom: 8}}><span style={InfoCardStyles.numberOfRepliesStyle}>{data.numberOfReplies}</span> replies</div>
                        </div>
                        <div style={InfoCardStyles.iconDetailsContainer}>
                            <img src={viewIcon} style={InfoCardStyles.iconStyle}/>
                            <div><span style={InfoCardStyles.numberOfViewsStyle}>{data.numberOfViews}</span> views</div>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
};