import React from 'react';
import ReactDom from 'react-dom';

import searchIcon from './../images/search_icon.png';

const topicsSearchBarStyle = {
    display: "flex",
    flexDirection: "row",
    width: "940px",
    marginLeft: "auto",
    marginRight: "auto"
};

const textInputStyle = {
    flex: "1 1 auto",
    lineHeight: "30px",
    fontSize: "large",
    padding: "0px 10px"
};

const submitInputStyle = {
    flex: "0 1 50px",    
    lineHeight: "30px"
};

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
            <div style={topicsSearchBarStyle}>
                <input type="text" placeholder="Search Topics" style={textInputStyle} />
                <input type="image" src={searchIcon} style={submitInputStyle} />
            </div>
        );
    }
}

module.exports = TopicsSearchBar;