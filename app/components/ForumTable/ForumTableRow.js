const React = require('react');
const ReactDom = require('react-dom');

const forumTableRowOddStyle = {
    backgroundColor: "#f2f2f2"
};

const forumTableRowEvenStyle = {
    backgroundColor: "#ffffff"
};

const forumTableCellStyle = {
    border: "1px solid #ddd",
    padding: "8px"
};

class ForumTableRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rowIndex: this.props.rowIndex,
            discussionPreview: this.props.discussionPreview
        };
    }

    createCells() {
        const cells = [];
        const keys = Object.keys(this.state.discussionPreview);
        for (let i = 0; i < keys.length; i++) {
            cells.push(
                <td key={"cell-" + i} style={forumTableCellStyle}>
                    {this.state.discussionPreview[keys[i]].toString()}
                </td>
            );
        }
        return cells;
    }

    render() {
        return <tr style={this.state.rowIndex % 2 == 0 ? forumTableRowEvenStyle : forumTableRowOddStyle}>{this.createCells()}</tr>;
    }
}

module.exports = ForumTableRow;