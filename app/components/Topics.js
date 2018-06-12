import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';

import TopicsSearchBar from './TopicsSearchBar';
import Forum from './Forum';
import Discussion from './Discussion';
import NavigationBar from './NavigationBar';

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
            numberOfColumns: 3,
            hoveredCellIndex: -1
        };
    }
    
    generateData() {
        const topics = [];
        for (let i = 0; i < 10; i++) {
            const topic = {
                title: "Topic " + i                
            };
            topics.push(topic);
        };

        return topics;
    }

    // Populates table with all rows
    createAllRows(topics) {
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

    /* 
        Create individual row
        rowIndex: key that's required by React
        rowTopics: actual data that's rendered
    */
    createRow(rowIndex, rowTopics) {
        const row = [];
        var path = "";
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

    /* 

    */
    createCell(cellKeyIndex, overallIndex, topic) {
        const linkProps = {
            forumTitle: topic.title
        };

        return (
            <td
                key={"cell-" + cellKeyIndex}
                onClick={() => this.cellOnClickHandler(linkProps)}
                onMouseOver={() => this.cellOnMouseover(overallIndex)}
                onMouseOut={() => this.cellOnMouseout()}
                style={this.state.hoveredCellIndex == overallIndex ? forumTableCellOnMouseoverStyle : forumTableCellOnMouseoutStyle}>
                <NavLink to={`/topic${overallIndex}`}>{topic.title}</NavLink>
            </td>
        );
    }

    cellOnClickHandler(linkProps) {    
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
                    <TopicsSearchBar />
                    <table style={forumTableStyle}>
                        <tbody>
                            {this.createAllRows(this.generateData())}
                        </tbody>
                    </table>
                </div>
        );
    }
}

module.exports = Topics;