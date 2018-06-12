import React from 'react';
import ReactDom from 'react-dom';

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
            post: this.props.post
        };
    }

    /**
     * Renders cell in the discussion table that includes details about the author for the corresponding post
     * @param   {number}            i           Index of cell per row of the discussion table used for defining the cell key
     * @param   {any}               cellData    Discussion data associated for an individual cell in the discussion table
     * @return  {React.Component}               Rendered component
     */
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

    /**
     * Renders cell in the discussion table that includes details about the corresponding post
     * @param   {number}            i           Index of cell per row of the discussion table used for defining the cell key
     * @param   {any}               cellData    Discussion data associated for an individual cell in the discussion table
     * @return  {React.Component}               Rendered component
     */
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

    /**
     * Renders all cells that populate a row in a discussion table
     * @return  {React.Component}   Rendered component
     */
    createCells() {
        const cells = [];
        cells.push(
            this.createAuthorCell(0, this.state.post.author),
            this.createPostCell(1, this.state.post.post)
        );
        return cells;
    }

    /**
     * Renders an individual row component in discussion table
     * @return  {React.Component}   Rendered component
     */
    render() {
        return <tr key={"row-" + 0} style={discussionTableRowStyle}>{this.createCells()}</tr>;
    }
}

module.exports = DiscussionTableRow;