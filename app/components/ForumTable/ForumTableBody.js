import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Link, IndexRoute, hashHistory, browserHistory, withRouter } from 'react-router-dom';

import ForumTableRow from './ForumTableRow';

class ForumTableBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            match: this.props.match,
            discussionPreviews: this.props.discussionPreviews
        };
    }

    createRows() {
        const rows = [];
        for (let i = 0; i < this.state.discussionPreviews.length; i++) {
            rows.push(
                <ForumTableRow
                    match={this.state.match}
                    key={"row-" + i}
                    rowIndex={i}
                    discussionPreview={this.state.discussionPreviews[i]}
                />
            );
        }
        return rows;
    }

    render() {
        return <tbody>{this.createRows()}</tbody>
    }
}

module.exports = withRouter(ForumTableBody);