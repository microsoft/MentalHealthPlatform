import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Link, IndexRoute, hashHistory, browserHistory, withRouter } from 'react-router-dom';

const segmentStyle = {
    fontSize: "large",
    fontFamily: "Calibri"
};

const segmentDividerStyle = {
    fontSize: "x-large",
    fontFamily: "Calibri"
}

class NavigationPath extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            navigationPath: this.props.navigationPath
        };
    }

    createNavigationPath() {
        const navigationPath = [];
        for (let i = 0; i < this.state.navigationPath.length; i++) {
            if (i > 0) {
                navigationPath.push(<span> > </span>);
            }
            navigationPath.push(this.createNavigationPathSegment(this.state.navigationPath[i]));
        }
        return navigationPath;
    }

    createNavigationPathSegment(segment) {
        return (
            <span style={segmentStyle}>{segment.title}</span>
        );
    }

    render() {
        return this.createNavigationPath();
    }
}

module.exports = withRouter(NavigationPath);