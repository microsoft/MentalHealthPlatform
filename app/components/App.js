const React = require('react');
const ReactDom = require('react-dom');

const NavigationBarPage = require('./NavigationBarPage');

class App extends React.Component {
    render() {
        return <NavigationBarPage />;
    }
}

module.exports = App;