import React from 'react';

import DiscussionTable from './DiscussionTable/DiscussionTable';
import DiscussionStyles from './DiscussionStyles';

class Discussion extends React.Component {
    
    /**
     * Temporary function that generates stub discussion data
     * @return  {any}   Stub discussion data
     */
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

    /**
     * Renders all discussion tables for a single discussion thread
     * @param   {any}               data    Discussion data
     * @return  {React.Component}           Rendered component
     */
    createDiscussionTables(data) {
        const discussionTables = [];
        for (let i = 0; i < data.posts.length; i++) {
            discussionTables.push(
                <DiscussionTable index={i} post={data.posts[i]} />
            );
        }
        return discussionTables;
    }

    /**
     * Renders an entire discussion thread component that includes header and individual discussion tables
     * @return  {React.Component}   Rendered component
     */
    render() {
        return (
            <div>
                <h1 style={DiscussionStyles.discussionTitleStyle}>{this.state.discussionTitle}</h1>
                {this.createDiscussionTables(this.generateData())}
            </div>
        );
    }
}

module.exports = Discussion;