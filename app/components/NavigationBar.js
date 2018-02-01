const React = require('react');
const ReactDom = require('react-dom');

const navigationBarStyle = {
    height: "50px",
    padding: "0px 25px",
    lineHeight: "50px",
    fontSize: "x-large",
    fontFamily: "Calibri",
    color: "#FFFFFF",
    backgroundColor: "#333333",
    boxShadow: "0px 0px 20px #1A1A1A"
};

const navigationBarTitleLink = {
    textDecoration: "none",
    color: "#FFFFFF"
};

class NavigationBar extends React.Component {
    createNavigationBar() {
        return (
            <div style={navigationBarStyle}>
                <a href="#" style={navigationBarTitleLink}>Mental Health Community</a>
            </div>
        );
    }
    
    render() {
        return this.createNavigationBar();
    }
}

module.exports = NavigationBar;