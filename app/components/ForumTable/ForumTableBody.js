var React = require('react');
var ReactDom = require('react-dom');

var ForumTableRow = require('./ForumTableRow');

class ForumTableBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            discussionPreviews: this.props.discussionPreviews
        };
    }

    createRows() {
        var rows = [];
        for (var i = 0; i < this.state.discussionPreviews.length; i++) {
            rows.push(
                <ForumTableRow
                    key={"row-" + i}
                    discussionPreview={this.state.discussionPreviews[i]}
                />
            );
        }
        return rows;
    }

    render() {
        return <tbody>{this.createRows()}</tbody>
    }
}

module.exports = ForumTableBody;