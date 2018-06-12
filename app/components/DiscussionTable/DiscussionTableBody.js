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

    /**
     * Renders all rows in a discussion table
     * @return  {React.Component}   Rendered component
     */
    createRows() {
        return (
            <DiscussionTableRow
                key={"row-" + 0}
                post={this.state.post}
            />
        );
    }

    /**
     * Renders table body component for discussion table
     * @return  {React.Component}   Rendered component
     */
    render() {
        return <tbody>{this.createRows()}</tbody>
    }
}

module.exports = DiscussionTableBody;