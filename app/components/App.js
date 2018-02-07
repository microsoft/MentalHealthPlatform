import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Link, IndexRoute, Redirect, hashHistory, browserHistory } from 'react-router-dom';

import Forum from './Forum';
import Topics from './Topics';
import NavigationBar from './NavigationBar';

const containerStyle = {
    padding: "25px"
};

class App extends React.Component {
    render() {
        return (
            <BrowserRouter history={hashHistory}>
            <div>
                <NavigationBar />
                <div style={containerStyle}>
                    <Route path='/'>
                        <div>
                            <Route path='/topics' component={Topics} />
                            <Redirect from="/" to="/topics" />
                        </div>
                    </Route>
                </div>
            </div>
            </BrowserRouter>
        );
    }
}

module.exports = App;