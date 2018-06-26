import React from 'react';
import { BrowserRouter, Route, Link, IndexRoute, hashHistory, browserHistory, withRouter } from 'react-router-dom';

import ForumTableHead from './ForumTableHead';
import ForumTableBody from './ForumTableBody';

import ForumTableStyles from "./ForumTableStyles";

class ForumTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            match: this.props.match,
            data: this.props.data
        };
    }

    /**
     * Renders forum table
     * @return  {React.Component}   Rendered component
     */
    createForumTable() {
        return (
            <table style={ForumTableStyles.forumTableStyle}>
                <ForumTableHead headers={this.state.data.headers} />
                <ForumTableBody discussionPreviews={this.state.data.discussionPreviews} />
            </table>
        );
    }

    /**
     * Renders forum table component
     * @return  {React.Component}   Rendered component
     */
    render() {
        return this.createForumTable();
    }
}

module.exports = withRouter(ForumTable);