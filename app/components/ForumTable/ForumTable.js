const React = require('react');
const ReactDom = require('react-dom');

const ForumTableHead = require('./ForumTableHead');
const ForumTableBody = require('./ForumTableBody');

const forumTableStyle = {
    fontFamily: "Arial",
    borderCollapse: "collapse",
    width: "100%"
};

class ForumTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
    }

    createForumTable() {
        return (
            <table style={forumTableStyle}>
                <ForumTableHead headers={this.state.data.headers} />
                <ForumTableBody discussionPreviews={this.state.data.discussionPreviews} />
            </table>
        );
    }

    render() {
        return this.createForumTable();
    }
}

module.exports = ForumTable;