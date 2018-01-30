var React = require('react');
var ReactDom = require('react-dom');

class ForumTableRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            discussionPreview: this.props.discussionPreview
        };
    }

    createColumns() {
        var columns = [];
        var keys = Object.keys(this.state.discussionPreview);
        for (var i = 0; i < keys.length; i++) {
            columns.push(
                <td key={"col-" + i}>
                    {this.state.discussionPreview[keys[i]].toString()}
                </td>
            );
        }
        return columns;
    }

    render() {
        return <tr>{this.createColumns()}</tr>;
    }
}

module.exports = ForumTableRow;