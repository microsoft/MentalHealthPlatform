var React = require('react');
var ReactDom = require('react-dom');

var ForumTable = require('./ForumTable/ForumTable');

class App extends React.Component {
    
    generateData() {
        var discussionPreviews = [];
        for (var i = 0; i < 10; i++) {
            var discussionPreview = {
                topic: "topic",
                author: "author",
                date: new Date(),
                lastCommentAuthor: "lastCommentAuthor",
                numberOfReplies: 12,
                numberOfViews: 123,
            };
            discussionPreviews.push(discussionPreview);
        };

        var headers = ["Topic", "Author", "Date", "Last Comment Author", "Replies", "Views"];

        var data = {
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