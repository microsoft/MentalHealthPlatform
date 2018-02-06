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

const cellLinkStyle = {
    color: "#000000"
};

class ForumTableRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rowIndex: this.props.rowIndex,
            discussionPreview: this.props.discussionPreview
        };
    }

    createTopicCell(i, cellData) {
        const cellStyle = Object.assign({}, forumTableCellStyle, {width: "70%"});
        const topicStyle = {
            fontWeight: "bold",
            fontSize: "large"
        };
                
        return (
            <td key={"cell-" + i} style={cellStyle}>
                <a href="#" style={cellLinkStyle}><span style={topicStyle}>{cellData.topic}</span></a>
                <br />
                by <a href="#" style={cellLinkStyle}>{cellData.author}</a>
            </td>
        );
    }

    createLastCommentCell(i, cellData) {
        const cellStyle = Object.assign({}, forumTableCellStyle, {width: "20%"});
        return (
            <td key={"cell-" + i} style={cellStyle}>
                {cellData.date.toLocaleString()}
                <br />
                by <a href="#" style={cellLinkStyle}>{cellData.author}</a>
            </td>
        );
    }

    createRepliesCell(i, cellData) {
        const cellStyle = Object.assign({}, forumTableCellStyle, {width: "5%", textAlign: "center"});
        return (
            <td key={"cell-" + i} style={cellStyle}>
                {cellData.numberOfReplies}
            </td>
        );
    }

    createViewsCell(i, cellData) {
        const cellStyle = Object.assign({}, forumTableCellStyle, {width: "5%", textAlign: "center"});
        return (
            <td key={"cell-" + i} style={cellStyle}>
                {cellData.numberOfViews}
            </td>
        );
    }

    createCells() {
        const cells = [];
        cells.push(
            this.createTopicCell(0, this.state.discussionPreview.topic),
            this.createLastCommentCell(1, this.state.discussionPreview.lastComment),
            this.createRepliesCell(2, this.state.discussionPreview.replies),
            this.createViewsCell(3, this.state.discussionPreview.views)
        );
        return cells;
    }

    render() {
        return <tr style={this.state.rowIndex % 2 == 0 ? forumTableRowEvenStyle : forumTableRowOddStyle}>{this.createCells()}</tr>;
    }
}

module.exports = ForumTableRow;