import React from 'react';
import ReactDom from 'react-dom';

const discussionTableHeaderStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    backgroundColor: "#CCCCCC",
    color: "#333333",
    textAlign: "right",
    fontSize: "small"
};

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
            <th key={"header-" + 0} colSpan={2} style={discussionTableHeaderStyle}>
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