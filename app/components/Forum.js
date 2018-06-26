import React from 'react';
// import { NavLink, withRouter } from 'react-router-dom';
import { BrowserRouter, Route, NavLink, IndexRoute, hashHistory, browserHistory, withRouter } from 'react-router-dom';

import ForumTable from './ForumTable/ForumTable';
import ForumStyles from './ForumStyles';

class Forum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            match: this.props.match
        };
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
        return (
            <div>
                <h1 style={ForumStyles.forumTitleStyle}>{this.props.location.state.forumTitle}</h1>
                <ForumTable match={this.state.match} data={this.generateData()} />
            </div>
        );
    }
}

module.exports = withRouter(Forum);