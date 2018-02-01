const React = require('react');
const ReactDom = require('react-dom');

const ForumTable = require('./ForumTable/ForumTable');

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
                topic: {
                    topic: "Topic",
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

        const headers = ["Topic", "Last Comment", "Replies", "Views"];

        const data = {
            headers: headers,
            discussionPreviews: discussionPreviews
        }

        return data;
    }

    render() {
        return (
            <div>
                <h1 style={forumTitleStyle}>Forum Title</h1>
                <ForumTable data={this.generateData()} />
            </div>
        );
    }
}

module.exports = Forum;