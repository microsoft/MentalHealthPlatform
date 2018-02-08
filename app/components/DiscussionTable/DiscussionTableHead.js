import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router-dom';

const discussionTableHeaderStyle = {
    border: "1px solid #ddd",
    padding: "12px 8px",
    backgroundColor: "#CCCCCC",
    color: "white",
    textAlign: "left"
};

class DiscussionTableHead extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: this.props.date
        };
    }

    createHeaders() {
        return (
            <th key={"header-" + 0} colSpan={2} style={discussionTableHeaderStyle}>
                {this.state.date}
            </th>
        );
    }

    render() {
        return <thead><tr>{this.createHeaders()}</tr></thead>
    }
}

module.exports = DiscussionTableHead;