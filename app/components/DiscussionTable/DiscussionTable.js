import React from 'react';
import ReactDom from 'react-dom';

import DiscussionTableHead from './DiscussionTableHead';
import DiscussionTableBody from './DiscussionTableBody';

const discussionTableStyle = {
    fontFamily: "Arial",
    borderCollapse: "collapse",
    width: "100%",
    marginBottom: "20px"
};

class DiscussionTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            index: this.props.index,
            post: this.props.post
        };
    }

    /**
     * Renders discussion table
     * @return  {React.Component}   Rendered component
     */
    createDiscussionTable() {
        return (
            <table key={"table-" + this.state.index} style={discussionTableStyle}>
                <DiscussionTableHead date={this.state.post.date} />
                <DiscussionTableBody post={this.state.post} />
            </table>
        );
    }

    /**
     * Renders discussion table component
     * @return  {React.Component}   Rendered component
     */
    render() {
        return this.createDiscussionTable();
    }
}

module.exports = DiscussionTable;