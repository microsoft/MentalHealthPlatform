const React = require('react');
const ReactDom = require('react-dom');

const forumTableHeaderStyle = {
    border: "1px solid #ddd",
    padding: "12px 8px",
    textAlign: "left",
    backgroundColor: "#4CAF50",
    color: "white"
};

class ForumTableHead extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            headers: this.props.headers
        };
    }

    createHeaders() {
        const headers = [];
        for (let i = 0; i < this.state.headers.length; i++) {
            headers.push(
                <th key={"header-" + i} style={forumTableHeaderStyle}>
                    {this.state.headers[i]}
                </th>
            );
        }
        return headers;
    }

    render() {
        return <thead><tr>{this.createHeaders()}</tr></thead>
    }
}

module.exports = ForumTableHead;