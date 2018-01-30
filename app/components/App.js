const React = require('react');
const ReactDom = require('react-dom');

const ForumTable = require('./ForumTable/ForumTable');

class App extends React.Component {
    
    generateData() {
        const discussionPreviews = [];
        for (let i = 0; i < 10; i++) {
            const discussionPreview = {
                topic: "topic",
                author: "author",
                date: new Date(),
                lastCommentAuthor: "lastCommentAuthor",
                numberOfReplies: 12,
                numberOfViews: 123,
            };
            discussionPreviews.push(discussionPreview);
        };

        const headers = ["Topic", "Author", "Date", "Last Comment Author", "Replies", "Views"];

        const data = {
            headers: headers,
            discussionPreviews: discussionPreviews
        }

        return data;
    }

    render() {
        return <ForumTable data={this.generateData()} />;
    }
}

module.exports = App;