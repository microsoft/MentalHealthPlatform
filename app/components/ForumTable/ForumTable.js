import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Link, IndexRoute, hashHistory, browserHistory, withRouter } from 'react-router-dom';

import ForumTableHead from './ForumTableHead';
import ForumTableBody from './ForumTableBody';

const forumTableStyle = {
    fontFamily: "Arial",
    borderCollapse: "collapse",
    width: "100%"
};

class ForumTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            match: this.props.match,
            navigationPath: this.props.navigationPath,
            data: this.props.data
        };
    }

    createForumTable() {
        return (
            <table style={forumTableStyle}>
                <ForumTableHead headers={this.state.data.headers} />
                <ForumTableBody match={this.state.match} navigationPath={this.state.navigationPath} discussionPreviews={this.state.data.discussionPreviews} />
            </table>
        );
    }

    render() {
        return this.createForumTable();
    }
}

module.exports = withRouter(ForumTable);