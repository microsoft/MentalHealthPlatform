const React = require('react');
const ReactDom = require('react-dom');

const ForumTableRow = require('./ForumTableRow');

class ForumTableBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            discussionPreviews: this.props.discussionPreviews
        };
    }

    createRows() {
        const rows = [];
        for (let i = 0; i < this.state.discussionPreviews.length; i++) {
            rows.push(
                <ForumTableRow
                    key={"row-" + i}
                    rowIndex={i}
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