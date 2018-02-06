import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router-dom';

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
            data: this.props.data
        };
    }

    createForumTable() {
        return (
            <table style={forumTableStyle}>
                <ForumTableHead headers={this.state.data.headers} />
                <ForumTableBody discussionPreviews={this.state.data.discussionPreviews} />
            </table>
        );
    }

    render() {
        return this.createForumTable();
    }
}

module.exports = ForumTable;