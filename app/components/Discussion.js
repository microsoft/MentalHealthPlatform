import React from 'react';
import ReactDom from 'react-dom';

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
            discussionTitle: this.props.location.state.discussionTitle
        };
    }

    createDiscussionTables(data) {
        const discussionTables = [];
        for (let i = 0; i < data.posts.length; i++) {
            discussionTables.push(
                <DiscussionTable index={i} post={data.posts[i]} />
            );
        }
        return discussionTables;
    }

    render() {
        return (
            <div>
                <h1 style={discussionTitleStyle}>{this.state.discussionTitle}</h1>
                {this.createDiscussionTables(this.generateData())}
            </div>
        );
    }
}

module.exports = Discussion;