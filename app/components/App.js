import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router-dom';

import NavigationBarPage from './NavigationBarPage';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter history={hashHistory}>
                <div>
                    <Route path='/' component={NavigationBarPage}>
                        <Route path='/index' component={NavigationBarPage} />
                    </Route>
                </div>
            </BrowserRouter>
        );
    }
}

module.exports = App;