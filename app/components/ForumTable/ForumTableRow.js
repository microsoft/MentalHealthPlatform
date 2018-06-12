import React from 'react';
import ReactDom from 'react-dom';

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
            rowIndex: this.props.rowIndex,
            discussionPreview: this.props.discussionPreview
        };
    }

    /**
     * Renders cell in the forum table that includes details about the topic for the corresponding discussion
     * @param   {number}            i           Index of cell per row of the forum table used for defining the cell key
     * @param   {any}               cellData    Forum data associated for an individual cell in the forum table
     * @return  {React.Component}               Rendered component
     */
    createTopicCell(i, cellData) {
        const cellStyle = Object.assign({}, forumTableCellStyle, {width: "70%"});
        const discussionStyle = {
            fontWeight: "bold",
            fontSize: "large",
            cursor: "pointer",
            textDecoration: "underline"
        };

        const discussionLinkProps = {
            discussionTitle: cellData.discussion
        }; 
                
        return (
            <td key={"cell-" + i} style={cellStyle}>
                <span onClick={() => this.discussionLinkOnClickHandler(discussionLinkProps)} style={discussionStyle}>{cellData.discussion}</span>
                <br />
                by <a href="#" style={cellLinkStyle}>{cellData.author}</a>
            </td>
        );
    }

    /**
     * Renders cell in the forum table that includes details about the last comment for the corresponding discussion
     * @param   {number}            i           Index of cell per row of the forum table used for defining the cell key
     * @param   {any}               cellData    Forum data associated for an individual cell in the forum table
     * @return  {React.Component}               Rendered component
     */
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

    /**
     * Renders cell in the forum table that includes details about the replies for the post
     * @param   {number}            i           Index of cell per row of the forum table used for defining the cell key
     * @param   {any}               cellData    Forum data associated for an individual cell in the forum table
     * @return  {React.Component}               Rendered component
     */
    createRepliesCell(i, cellData) {
        const cellStyle = Object.assign({}, forumTableCellStyle, {width: "5%", textAlign: "center"});
        return (
            <td key={"cell-" + i} style={cellStyle}>
                {cellData.numberOfReplies}
            </td>
        );
    }

    /**
     * Renders cell in the forum table that includes details about the views for the post
     * @param   {number}            i           Index of cell per row of the forum table used for defining the cell key
     * @param   {any}               cellData    Forum data associated for an individual cell in the forum table
     * @return  {React.Component}               Rendered component
     */
    createViewsCell(i, cellData) {
        const cellStyle = Object.assign({}, forumTableCellStyle, {width: "5%", textAlign: "center"});
        return (
            <td key={"cell-" + i} style={cellStyle}>
                {cellData.numberOfViews}
            </td>
        );
    }

    /**
     * Renders all cells that populate a row in a forum table
     * @return  {React.Component}   Rendered component
     */
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

    /**
     * Onclick handler for a discussion link
     * @return  {any}   linkProps   Properties associated with discussion corresponding to clicked link
     */
    discussionLinkOnClickHandler(linkProps) {
    }

    /**
     * Renders a row component in forum table
     * @return  {React.Component}   Rendered component
     */
    render() {
        return <tr style={this.state.rowIndex % 2 == 0 ? forumTableRowEvenStyle : forumTableRowOddStyle}>{this.createCells()}</tr>;
    }
}

module.exports = ForumTableRow;