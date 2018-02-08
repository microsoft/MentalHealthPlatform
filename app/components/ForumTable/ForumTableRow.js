import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Link, IndexRoute, hashHistory, browserHistory, withRouter } from 'react-router-dom';

import Discussion from './../Discussion'

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
            match: this.props.match,
            rowIndex: this.props.rowIndex,
            discussionPreview: this.props.discussionPreview
        };
    }

    createTopicCell(i, cellData) {
        const cellStyle = Object.assign({}, forumTableCellStyle, {width: "70%"});
        const discussionStyle = {
            fontWeight: "bold",
            fontSize: "large",
            cursor: "pointer",
            textDecoration: "underline"
        };

        const discussionLinkProps = {
            pathname: `${this.state.match.url}/${cellData.discussion.replace(" ", "")}`,
            discussionTitle: cellData.discussion
        }; 
                
        return (
            <td key={"cell-" + i} style={cellStyle}>
                <span onClick={() => this.discussionLinkOnClickHandler(discussionLinkProps)} style={discussionStyle}>{cellData.discussion}</span>
                <Route path={`${this.state.match.url}/:discussionId`} component={Discussion} />
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
            this.createTopicCell(0, this.state.discussionPreview.discussion),
            this.createLastCommentCell(1, this.state.discussionPreview.lastComment),
            this.createRepliesCell(2, this.state.discussionPreview.replies),
            this.createViewsCell(3, this.state.discussionPreview.views)
        );
        return cells;
    }

    discussionLinkOnClickHandler(linkProps) {   
        this.props.history.push({
            pathname: linkProps.pathname,
            state: {
                match: this.state.match,
                discussionTitle: linkProps.discussionTitle
            }
        });
    }

    render() {
        return <tr style={this.state.rowIndex % 2 == 0 ? forumTableRowEvenStyle : forumTableRowOddStyle}>{this.createCells()}</tr>;
    }
}

module.exports = withRouter(ForumTableRow);