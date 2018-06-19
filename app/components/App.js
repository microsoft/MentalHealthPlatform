import React from 'react';

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

module.exports = App;