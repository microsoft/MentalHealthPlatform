import React from "react";
import { withRouter } from "react-router-dom";
import { InfoCard } from "./InfoCard/InfoCard";

import ForumStyles from './ForumStyles';

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
                title: "Discussion " + i,
                subtitle: "This is subtitle",
                author: "author",
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
        const forumTitle = forumId ? "Topic " + forumId : this.props.location.state.forumTitle;

        const infoCards = this.generateData().map(discussionPreview => {
            return <InfoCard key={discussionPreview.id} data={discussionPreview} />
        });

        return (
            <div>
                <h1 style={ForumStyles.forumTitleStyle}>{forumTitle}</h1>
                {infoCards}
            </div>
        );
    }
}

module.exports = withRouter(Forum);