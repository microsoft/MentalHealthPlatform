import React from 'react';

import searchIcon from './../images/search_icon.png';
import TopicsSearchBarStyles from './TopicsSearchBarStyles';

class TopicsSearchBar extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    searchStringChangedHandler = (event) => {
        this.props.inputChanged(event.target.value);
    }

    /**
     * Renders topics search bar component
     * @return  {React.Component}   Rendered component
     */
    render() {
        return (
            <div style={TopicsSearchBarStyles.topicsSearchBarStyle}>
                <input 
                    type="text"
                    placeholder="Search Topics" 
                    style={TopicsSearchBarStyles.textInputStyle}
                    onChange={this.searchStringChangedHandler} />
                <button
                    style={TopicsSearchBarStyles.submitInputStyle}
                    type='submit'>
                    <input type="image" src={searchIcon} style={TopicsSearchBarStyles.searchIconStyle} />
                </button>
            </div>
        );
    }
}

module.exports = TopicsSearchBar;