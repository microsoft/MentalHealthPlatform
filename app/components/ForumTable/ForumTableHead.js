var React = require('react');
var ReactDom = require('react-dom');

class ForumTableHead extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            headers: this.props.headers
        };
    }

    createHeaders() {
        var headers = [];
        for (var i = 0; i < this.state.headers.length; i++) {
            headers.push(
                <th key={"header-" + i}>
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