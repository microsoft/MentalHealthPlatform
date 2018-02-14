import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Switch, Link, IndexRoute, Redirect, hashHistory, browserHistory } from 'react-router-dom';

import Topics from './Topics';
import SignupLogin from './SignupLogin';
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
                            <Route path='/login' component={SignupLogin} />
                            <Switch>
                                <Route exact path="/" component={Topics} />
                            </Switch>
                        </div>
                    </Route>
                </div>
            </div>
            </BrowserRouter>
        );
    }
}

module.exports = App;