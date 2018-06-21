import React from 'react';
// import { NavLink, withRouter } from 'react-router-dom';
import { BrowserRouter, Route, NavLink, IndexRoute, hashHistory, browserHistory, withRouter } from 'react-router-dom';

import AppStyles from "./AppStyles";

class App extends React.Component {
    /**
     * Renders overall application component
     * @return  {React.Component}   Rendered component
     */
    render() {
        return <div style={AppStyles.containerStyle}></div>;
    }
}

module.exports = withRouter(App);