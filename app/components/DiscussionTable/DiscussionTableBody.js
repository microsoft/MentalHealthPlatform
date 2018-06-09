import React from 'react';
import ReactDom from 'react-dom';

import DiscussionTableRow from './DiscussionTableRow';

class DiscussionTableBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            post: this.props.post
        };
    }

    createRows() {
        return (
            <DiscussionTableRow
                key={"row-" + 0}
                post={this.state.post}
            />
        );
    }

    render() {
        return <tbody>{this.createRows()}</tbody>
    }
}

module.exports = DiscussionTableBody;