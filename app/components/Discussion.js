import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router-dom';

const discussionTitleStyle = {
    fontFamily: "Calibri",
    textAlign: "center",
    color: "#181818"
};

class Discussion extends React.Component {
    
    generateData() {
        
    }

    constructor(props) {
        super(props);
        this.state = {
            match: this.props.match,
            discussionTitle: this.props.location.state.discussionTitle
        };
    }

    render() {
        return (
            <div>
                <h1 style={discussionTitleStyle}>{this.state.discussionTitle}</h1>
            </div>
        );
    }
}

module.exports = Discussion;