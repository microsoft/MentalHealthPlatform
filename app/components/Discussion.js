import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router-dom';

import NavigationPath from './NavigationPath';
import DiscussionTable from './DiscussionTable/DiscussionTable';

const discussionTitleStyle = {
    fontFamily: "Calibri",
    textAlign: "center",
    color: "#181818"
};

class Discussion extends React.Component {
    
    generateData() {
        let postContent = "";
        for (let a = 0; a < 100; a++) {
            postContent += "text ";
        }

        const posts = [];
        for (let i = 0; i < 10; i++) {
            const post = {
                author: {
                    author: "author",
                    memberSince: new Date(),
                    numberOfPosts: 123
                },
                post: {
                    content: postContent,
                    rating: 123
                },
                date: new Date()
            };
            posts.push(post);
        };

        const data = {
            posts: posts
        }

        return data;
    }

    constructor(props) {
        super(props);
        this.state = {
            match: this.props.match,
            navigationPath: this.updateNavigationPath(this.props.location.state.navigationPath, "discussion", this.props.location.state.discussionTitle),
            discussionTitle: this.props.location.state.discussionTitle
        };
    }

    updateNavigationPath(navigationPath, pageType, title) {
        const segment = {
            title: title,
            pageType: pageType,
            url: this.props.match.url
        };
        if (navigationPath) {
            for (let i = 0; i < navigationPath.length; i++) {
                if (navigationPath[i].pageType.indexOf(pageType) >= 0) {
                    navigationPath[i] = segment;
                    return navigationPath;
                }
            }
            navigationPath.push(segment);
            return navigationPath;
        }
        return [segment];
    }

    createDiscussionTables(data) {
        const discussionTables = [];
        for (let i = 0; i < data.posts.length; i++) {
            discussionTables.push(
                <DiscussionTable match={this.state.match} index={i} post={data.posts[i]} />
            );
        }
        return discussionTables;
    }

    render() {
        return (
            <div>
                <NavigationPath navigationPath={this.state.navigationPath} />
                <h1 style={discussionTitleStyle}>{this.state.discussionTitle}</h1>
                {this.createDiscussionTables(this.generateData())}
            </div>
        );
    }
}

module.exports = Discussion;