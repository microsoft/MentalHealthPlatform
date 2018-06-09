import React from 'react';
import ReactDom from 'react-dom';

import Topics from './Topics';
import SignupLogin from './SignupLogin';
import NavigationBar from './NavigationBar';

const containerStyle = {
    padding: "25px"
};

class App extends React.Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <div style={containerStyle}>
                    <Topics />
                </div>
            </div>
        );
    }
}

module.exports = App;