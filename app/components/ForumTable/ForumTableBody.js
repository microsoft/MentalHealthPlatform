import React from 'react';
import ReactDom from 'react-dom';

import ForumTableRow from './ForumTableRow';

class ForumTableBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            discussionPreviews: this.props.discussionPreviews
        };
    }

    /**
     * Renders all rows in a forum table
     * @return  {React.Component}   Rendered component
     */
    createRows() {
        const rows = [];
        for (let i = 0; i < this.state.discussionPreviews.length; i++) {
            rows.push(
                <ForumTableRow
                    key={"row-" + i}
                    rowIndex={i}
                    discussionPreview={this.state.discussionPreviews[i]}
                />
            );
        }
        return rows;
    }

    /**
     * Renders table body component for forum table
     * @return  {React.Component}   Rendered component
     */
    render() {
        return <tbody>{this.createRows()}</tbody>
    }
}

module.exports = ForumTableBody;