import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router-dom';

import Forum from './Forum';

class Topics extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            match: this.props.match
        };
    }
    
    render() {
        return (
            <div>
                <Route exact path={`${this.state.match.url}`} render={() => (
                    <ul>
                    <li>
                        <Link to={{pathname: `${this.state.match.url}/forum1`, state: {forumTitle: "TOPIC 1"}}}>Topic 1</Link>
                    </li>
                    <li>
                        <Link to={{pathname: `${this.state.match.url}/forum2`, state: {forumTitle: "TOPIC 2"}}}>Topic 2</Link>
                    </li>
                    <li>
                        <Link to={{pathname: `${this.state.match.url}/forum3`, state: {forumTitle: "TOPIC 3"}}}>Topic 3</Link>
                    </li>
                </ul>
                )}/>
                <Route path={`${this.state.match.url}/:forumId`} component={Forum} />
            </div>
        );
    }
}

module.exports = Topics;