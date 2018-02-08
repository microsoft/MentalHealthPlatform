import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Link, IndexRoute, hashHistory, browserHistory, withRouter } from 'react-router-dom';

import Discussion from './../Discussion'

const discussionTableRowStyle = {
    backgroundColor: "#ffffff"
};

const discussionTableCellStyle = {
    border: "1px solid #ddd",
    padding: "8px"
};

const cellLinkStyle = {
    color: "#000000",
    fontWeight: "bold",
    fontSize: "large"
};

class DiscussionTableRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            match: this.props.match,            
            post: this.props.post
        };
    }

    createAuthorCell(i, cellData) {
        const cellStyle = Object.assign({}, discussionTableCellStyle, {width: "20%"});
                
        return (
            <td key={"cell-" + i} style={cellStyle}>
                <a href="#" style={cellLinkStyle}>{cellData.author}</a>
                <br /><br />
                {"Member Since: " + cellData.memberSince.toDateString()}
                <br />
                {"Posts: " + cellData.numberOfPosts}
            </td>
        );
    }

    createPostCell(i, cellData) {
        const cellStyle = Object.assign({}, discussionTableCellStyle, {width: "80%"});
        return (
            <td key={"cell-" + i} style={cellStyle}>
                {cellData.content}
                <br /><br />
                {cellData.rating}
            </td>
        );
    }

    createCells() {
        const cells = [];
        cells.push(
            this.createAuthorCell(0, this.state.post.author),
            this.createPostCell(1, this.state.post.post)
        );
        return cells;
    }

    render() {
        return <tr key={"row-" + 0} style={discussionTableRowStyle}>{this.createCells()}</tr>;
    }
}

module.exports = withRouter(DiscussionTableRow);