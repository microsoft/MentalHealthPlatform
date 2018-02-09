import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Link, IndexRoute, hashHistory, browserHistory, withRouter } from 'react-router-dom';

import NavigationPath from './NavigationPath';
import ForumTable from './ForumTable/ForumTable';

const forumTitleStyle = {
    fontFamily: "Calibri",
    textAlign: "center",
    color: "#181818"
};

class Forum extends React.Component {
    
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

    constructor(props) {
        super(props);
        this.state = {
            match: this.props.match,
            navigationPath: this.updateNavigationPath(this.props.location.state.navigationPath, this.props.location.state.forumTitle)
        };
    }

    updateNavigationPath(navigationPath, title) {
        console.log(this.props);
        const segment = {
            title: title,
            url: this.props.match.url
        };
        if (navigationPath) {
            navigationPath.push(segment);
            return navigationPath;
        }
        return [segment];
    }

    render() {
        return (
            <div>
                <NavigationPath navigationPath={this.state.navigationPath} />
                <h1 style={forumTitleStyle}>{this.props.location.state.forumTitle}</h1>
                <ForumTable match={this.state.match} navigationPath={this.state.navigationPath} data={this.generateData()} />
            </div>
        );
    }
}

module.exports = withRouter(Forum);