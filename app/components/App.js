import React from 'react';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';

const containerStyle = {
    padding: "25px"
};

class App extends React.Component {
    /**
     * Renders overall application component
     * @return  {React.Component}   Rendered component
     */
    render() {
        return <div style={containerStyle}></div>;
    }
}

module.exports = App;