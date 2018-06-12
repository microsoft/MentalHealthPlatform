import React from 'react';
import ReactDom from 'react-dom';

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
    }

    render() {
        return (
            <div>
                {/* <h1 style={forumTitleStyle}>{this.props.location.state.forumTitle}</h1> */}
                <h1 style={forumTitleStyle}>TEST</h1>
                <ForumTable data={this.generateData()} />
            </div>
        );
    }
}

module.exports = Forum;