import React from 'react';
// import { NavLink, withRouter } from 'react-router-dom';
import { BrowserRouter, Route, NavLink, IndexRoute, hashHistory, browserHistory, withRouter } from 'react-router-dom';

import ForumTable from './ForumTable/ForumTable';
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
        for (let i = 0; i < 10; i++) {
            const discussionPreview = {
                discussion: {
                    discussion: "Discussion " + i,
                    author: "author"
                },
                lastComment: {
                    date: new Date(),
                    author: "author"
                },                
                replies: {
                    numberOfReplies: 12
                },
                views: {
                    numberOfViews: 123,
                }
            };
            discussionPreviews.push(discussionPreview);
        };

        const headers = ["Discussion", "Last Comment", "Replies", "Views"];

        const data = {
            headers: headers,
            discussionPreviews: discussionPreviews
        }

        return data;
    }

    /**
     * Renders forum component
     * @return  {React.Component}   Rendered component
     */
    render() {
        const forumId = this.state.forumId;
        const forumTitle = forumId ? "Topic " + forumId : this.props.location.state.forumTitle;

        return (
            <div>
                <h1 style={ForumStyles.forumTitleStyle}>{forumTitle}</h1>
                <ForumTable match={this.state.match} data={this.generateData()} />
            </div>
        );
    }
}

module.exports = withRouter(Forum);