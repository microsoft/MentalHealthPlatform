import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router-dom';

import Forum from './Forum';
import NavigationBar from './NavigationBar';

const containerStyle = {
    padding: "25px"
};

class NavigationBarPage extends React.Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <div style={containerStyle}>
                    <Forum />
                </div>
            </div>
        );
    }
}

module.exports = NavigationBarPage;