import React from "react";
import { withRouter, Link } from 'react-router-dom';
import { InfoCard } from "./InfoCard/InfoCard";

import ForumStyles from './ForumStyles';

import { BASE_URL } from './../../util/Helpers';

class Forum extends React.Component {
    constructor(props) {
        super(props);
        const forumId = this.obtainForumId(this.props.match.url);
        this.state = {
            match: this.props.match,
            forumId: forumId
        };
    }

    getTopicId() {
        let subUrl = this.props.match.url.replace("createChat/", "").replace("createChat", "");        
        
        let list = subUrl.split("/");
        list = list.filter((item) => item != "");

        const topicId = list[list.length - 1].replace("topic", "");
        
        return topicId;
    };

    obtainForumId(url) {
        var regex = /^\/topics\/topic[\d]+[\/]?$/;
        var anythingButNumRegex = /[\/a-zA-Z]+/g;

        if (regex.test(url)) {
            // Checking /topic{num}/ or /topic{num} and nothing after
            return url.replace(anythingButNumRegex, "");
        }

        return null;
    }

    /**
     * Renders forum component
     * @return  {React.Component}   Rendered component
     */
    render() {
        const forumData = this.state.forumData;
        if (!forumData) {
            return null;
        }
        
        const infoCards = forumData.map(discussionPreview => {
            return <InfoCard key={discussionPreview.id} data={discussionPreview} match={this.props.match} />
        });

        const containerStyle = Object.assign({}, ForumStyles.containerStyle, {
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 1)), url(${require('./../../images/topic_image_0.jpg')})`
        });

        let baseUrl = this.props.match.url;
        if (baseUrl.charAt(baseUrl.length - 1) == '/') {
            baseUrl = baseUrl.substring(0, baseUrl.length - 1);
        }

        return (
            <div style={containerStyle}>
                <div style={ForumStyles.bodyStyle}>
                    <h1 style={ForumStyles.forumTitleStyle}>{"Topic " + this.state.forumId}</h1>
                    <div style={{justifyContent: "flex-end", display: "flex"}}>
                        <Link to={`${baseUrl}/createChat`} style={ForumStyles.createChatStyle}>
                            <button
                                style={ForumStyles.createChatButtonStyle}>
                                <span style={{fontWeight: "bold"}}>+</span>
                                <span style={{}}> Create new discussion</span>
                            </button>
                        </Link>
                    </div>
                    {infoCards}
                </div>
            </div>
        );
    }

    componentDidMount() {
        const _this = this;
        fetch(`${BASE_URL}/getchatpreviews?topicId=${this.getTopicId()}`, {
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
                forumData: data
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}

module.exports = withRouter(Forum);