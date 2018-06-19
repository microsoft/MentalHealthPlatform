import React from 'react';

import ForumTable from './ForumTable/ForumTable';
import ForumStyles from './ForumStyles';

class Forum extends React.Component {
    
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

    constructor(props) {
        super(props);
    }

    /**
     * Renders forum component
     * @return  {React.Component}   Rendered component
     */
    render() {
        return (
            <div>
                {/* <h1 style={ForumStyles.forumTitleStyle}>{this.props.location.state.forumTitle}</h1> */}
                <h1 style={ForumStyles.forumTitleStyle}>TEST</h1>
                <ForumTable data={this.generateData()} />
            </div>
        );
    }
}

module.exports = Forum;