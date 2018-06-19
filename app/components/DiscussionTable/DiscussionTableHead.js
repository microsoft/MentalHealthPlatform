import React from 'react';

import DiscussionTableStyles from "./DiscussionTableStyles";

class DiscussionTableHead extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: this.props.date
        };
    }

    /**
     * Renders table header for discussion table
     * @return  {React.Component}   Rendered component
     */
    createHeaders() {
        return (
            <th key={"header-" + 0} colSpan={2} style={DiscussionTableStyles.discussionTableHeaderStyle}>
                {this.state.date.toLocaleString()}
            </th>
        );
    }

    /**
     * Renders table header component for discussion table
     * @return  {React.Component}   Rendered component
     */
    render() {
        return <thead><tr>{this.createHeaders()}</tr></thead>
    }
}

module.exports = DiscussionTableHead;