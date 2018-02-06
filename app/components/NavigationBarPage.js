const React = require('react');
const ReactDom = require('react-dom');

const Forum = require('./Forum');
const NavigationBar = require('./NavigationBar');

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