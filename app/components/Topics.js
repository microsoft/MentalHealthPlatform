import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Link, IndexRoute, hashHistory, browserHistory, withRouter } from 'react-router-dom';

import Forum from './Forum';
import Discussion from './Discussion';

const forumTableStyle = {
    margin: "0 auto",
    fontFamily: "Calibri",
    borderSpacing: "20px"
};

const forumTableCellStyle = {
    width: "300px",
    height: "300px",
    fontSize: "xx-large",
    textAlign: "center",
    color: "#333333",
    fontWeight: "bold",
    cursor: "pointer"
};
const forumTableCellOnMouseoutStyle = Object.assign({}, forumTableCellStyle, {backgroundColor: "#E8E8E8"});
const forumTableCellOnMouseoverStyle = Object.assign({}, forumTableCellStyle, {backgroundColor: "#CCCCCC"});

class Topics extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            match: this.props.match,
            navigationPath: this.updateNavigationPath(this.props.navigationPath, "Topics"),
            numberOfColumns: 3,
            hoveredCellIndex: -1
        };
    }

    updateNavigationPath(navigationPath, title) {
        const segment = {
            title: title,
            url: this.props.match.url
        };
        if (navigationPath) {
            navigationPath.push(segment);
            return navigationPath;
        }
        return [segment];
    }
    
    generateData() {
        const topics = [];
        for (let i = 0; i < 10; i++) {
            const topic = {
                path: "forum" + i,
                title: "Topic " + i                
            };
            topics.push(topic);
        };

        return topics;
    }

    createRows(topics) {
        const rows = [];
        for (let i = 0; i < topics.length; i += this.state.numberOfColumns) {
            const rowTopics = [];
            for (let j = 0; j < this.state.numberOfColumns; j++) {
                rowTopics.push(topics[i + j]);
            }            
            rows.push(this.createRow(i / this.state.numberOfColumns, rowTopics));
        }
        return rows;
    }

    createRow(rowIndex, rowTopics) {
        const row = [];
        for (let i = 0; i < this.state.numberOfColumns; i++) {
            if (!rowTopics[i]) {
                break;
            }
            row.push(this.createCell(i, rowIndex * this.state.numberOfColumns + i, rowTopics[i]));
        }
        return (
            <tr key={"row-" + rowIndex}>{row}</tr>
        );
    }

    createCell(cellIndex, overallIndex, topic) {
        const linkProps = {
            pathname: `${this.state.match.url}/${topic.path}`,
            forumTitle: topic.title
        };
        return (
            <td
                key={"cell-" + cellIndex}
                onClick={() => this.cellOnClickHandler(linkProps)}
                onMouseOver={() => this.cellOnMouseover(overallIndex)}
                onMouseOut={() => this.cellOnMouseout()}
                style={this.state.hoveredCellIndex == overallIndex ? forumTableCellOnMouseoverStyle : forumTableCellOnMouseoutStyle}>
                {topic.title}
            </td>
        );
    }

    cellOnClickHandler(linkProps) {    
        this.props.history.push({
            pathname: linkProps.pathname,
            state: {
                match: this.state.match,
                navigationPath: this.state.navigationPath,
                forumTitle: linkProps.forumTitle
            }
        });
    }

    cellOnMouseover(overallIndex) {
        this.setState({
            hoveredCellIndex: overallIndex
        });
    }

    cellOnMouseout() {
        this.setState({
            hoveredCellIndex: -1
        });
    }

    render() {
        return (
            <div>
                <Route exact path={`${this.state.match.url}`} render={() => (
                    <table style={forumTableStyle}>
                        <tbody>
                            {this.createRows(this.generateData())}
                        </tbody>
                    </table>
                )}/>
                <Route exact path={`${this.state.match.url}/:forumId`} component={Forum} />
                <Route path={`${this.state.match.url}/:forumId/:discussionId`} component={Discussion} />
            </div>
        );
    }
}

module.exports = withRouter(Topics);