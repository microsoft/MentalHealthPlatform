import React from 'react';

import searchIcon from './../images/search_icon.png';
import TopicsSearchBarStyles from './TopicsSearchBarStyles';

class TopicsSearchBar extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    /**
     * Renders topics search bar component
     * @return  {React.Component}   Rendered component
     */
    render() {
        return (
            <div style={TopicsSearchBarStyles.topicsSearchBarStyle}>
                <input type="text" placeholder="Search Topics" style={TopicsSearchBarStyles.textInputStyle} />
                <input type="image" src={searchIcon} style={TopicsSearchBarStyles.submitInputStyle} />
            </div>
        );
    }
}

module.exports = TopicsSearchBar;