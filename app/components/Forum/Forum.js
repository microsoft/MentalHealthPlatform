import React from "react";
import { withRouter } from "react-router-dom";
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
     * Temporary function that generates stub forum data
     * @return  {any}   Stub forum data
     */
    generateData() {
        const discussionPreviews = [];
        const date =  new Date();

        for (let i = 0; i < 10; i++) {
            const discussionPreview = {
                id: i,
                title: "Coping with stress at work",
                subtitle: "My job is very stressful. I have many deadlines coming, and it is becoming overwhelming. Anyone have some suggestions on how I can reduce my deaily stress?",
                author: "Robert S.",
                numberOfReplies: 12,
                numberOfViews: 123,
                date: `${date.getMonth()}\\${date.getDate()}\\${date.getFullYear()}`,
            };
            discussionPreviews.push(discussionPreview);
        };
        return discussionPreviews;
    }

    /**
     * Renders forum component
     * @return  {React.Component}   Rendered component
     */
    render() {
        const forumId = this.state.forumId;
        const forumTitle = "Stress";

        const infoCards = this.generateData().map(discussionPreview => {
            return <InfoCard key={discussionPreview.id} data={discussionPreview} match={this.props.match} />
        });

        const containerStyle = Object.assign({}, ForumStyles.containerStyle, {
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 1)), url(${require('./../../images/topic_image_0.jpg')})`
        });

        return (
            <div style={containerStyle}>
                <div style={ForumStyles.bodyStyle}>
                    <h1 style={ForumStyles.forumTitleStyle}>{forumTitle}</h1>
                    {infoCards}
                </div>
            </div>
        );
    }

    componentDidMount() {
        fetch(`${BASE_URL}/getchatpreviews?topicId=${1}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(function(response) {
            const output = response.json();
            return output;
        }).then(function(data) {
            console.log(data);
        }).catch((error) => {
            console.log(error);
        });
    }
}

module.exports = withRouter(Forum);