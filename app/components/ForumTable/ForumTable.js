var React = require('react');
var ReactDom = require('react-dom');

var ForumTableHead = require('./ForumTableHead');
var ForumTableBody = require('./ForumTableBody');

class ForumTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
    }

    createForumTable() {
        return (
            <table>
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