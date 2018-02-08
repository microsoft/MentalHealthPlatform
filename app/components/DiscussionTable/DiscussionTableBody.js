import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Link, IndexRoute, hashHistory, browserHistory, withRouter } from 'react-router-dom';

import DiscussionTableRow from './DiscussionTableRow';

class DiscussionTableBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            match: this.props.match,
            post: this.props.post
        };
    }

    createRows() {
        return (
            <DiscussionTableRow
                match={this.state.match}
                key={"row-" + 0}
                post={this.state.post}
            />
        );
    }

    render() {
        return <tbody>{this.createRows()}</tbody>
    }
}

module.exports = withRouter(DiscussionTableBody);