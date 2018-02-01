const React = require('react');
const ReactDom = require('react-dom');

const BasicPage = require('./BasicPage');

class App extends React.Component {
    render() {
        return <BasicPage />;
    }
}

module.exports = App;