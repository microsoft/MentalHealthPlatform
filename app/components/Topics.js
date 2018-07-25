import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import TopicsSearchBar from './TopicsSearchBar';
import TopicsStyles from './TopicsStyles';

import { BASE_URL } from './../util/Helpers';

class Topics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            match: this.props.match,
            numberOfColumns: 4,
            hoveredCellIndex: -1
        };
    }
    
    getBackgroundImageMouseout(src) {
        return `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${src})`;
    };

    getBackgroundImageMouseover(src) {
        return `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${src})`;
    };

    /**
     * Temporary function that generates stub topics data
     * @return  {any}   Stub topics data
     */
    generateData() {
        const topics = [];
        for (let i = 0; i < 8; i++) {
            const topic = {
                title: "Topic " + i                
            };
            topics.push(topic);
        };
        return topics;
    }

    /**
     * Renders all rows in a topics table
     * @param   {any}               rowTopics   Topics data used to populate topics table
     * @return  {React.Component}               All rows in topics table
     */
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

    /**
     * Renders a single rows in a topics table
     * @param   {number}            rowIndex    Index of each row in topics table; used to define the key of the row
     * @param   {any}               rowTopics   Topics data used to populate entire row in topics table
     * @return  {React.Component}               Single row in topics table
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

    /**
     * Renders a single cell in a topics table row
     * @param   {number}            cellKeyIndex    Index of cell in respect to topics row; used to define key of the cell 
     * @param   {number}            overallIndex    Index of cell in respect to entire topics table
     * @param   {any}               topic           Topic data
     * @return  {React.Component}                   Single cell in topics table
     */
    createCell(cellKeyIndex, overallIndex, topic) {
        const linkProps = {
            forumTitle: topic.title
        };

        let baseUrl = this.state.match.url;
        if (baseUrl.charAt(baseUrl.length - 1) == '/') {
            baseUrl = baseUrl.substring(0, baseUrl.length - 1);
        }

        const forumTableCellOnMouseoutStyle = Object.assign({}, TopicsStyles.forumTableCellStyle, {
            backgroundImage: this.getBackgroundImageMouseout(require(`./../images/topic_image_${overallIndex}.jpg`))
        });

        const forumTableCellOnMouseoverStyle = Object.assign({}, TopicsStyles.forumTableCellStyle, {
            backgroundImage: this.getBackgroundImageMouseover(require(`./../images/topic_image_${overallIndex}.jpg`))
        });

        return (
            <Link key={"cell-" + cellKeyIndex} to={`${baseUrl}/topic${overallIndex}`} style={TopicsStyles.topicLinkStyle}>
                <td
                    onClick={() => this.cellOnClickHandler(linkProps)}
                    onMouseOver={() => this.cellOnMouseover(overallIndex)}
                    onMouseOut={() => this.cellOnMouseout()}
                    style={this.state.hoveredCellIndex == overallIndex ? forumTableCellOnMouseoverStyle : forumTableCellOnMouseoutStyle}
                >
                    {topic.title}
                </td>
            </Link>
        );
    }

    /**
     * Onclick handler for a cell in the topics table
     * @param   {any}   linkProps    Properties associated with cell
     */
    cellOnClickHandler(linkProps) { 
        this.props.history.push({
            pathname: linkProps.pathname,
            state: {
                match: this.props.match,
                forumTitle: linkProps.forumTitle
            }
        });
    }
    
    /**
     * Onmouseover handler for a cell in the topics table to update state to indicate that the cell is being hovered upon
     * Implements onhover background colour changing effect
     * @param   {number}    overallIndex    Index of cell in respect to entire topics table
     */
    cellOnMouseover(overallIndex) {
        this.setState({
            hoveredCellIndex: overallIndex
        });
    }

    /**
     * Onmouseout handler for a cell in the topics table to update state to indicate that all cells are not being hovered upon
     * Implements onhover background colour changing effect
     */
    cellOnMouseout() {
        this.setState({
            hoveredCellIndex: -1
        });
    }

    /**
     * Renders topics component including search bar and topics table
     * @return  {React.Component}   Rendered component
     */
    render() {
        const backgroundStyle = Object.assign({}, TopicsStyles.backgroundStyle, {
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0), rgba(255, 255, 255, 1)), url(${require('./../images/background_cropped.jpg')})`
        });

        return (
            <div>
                <div style={backgroundStyle}></div>
                <div style={TopicsStyles. containerStyle}>
                    <TopicsSearchBar />
                    <table style={TopicsStyles.forumTableStyle}>
                        <tbody>
                            {this.createAllRows(this.generateData())}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    componentDidMount() {
        fetch(`${BASE_URL}/gettopics`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(function(response) {
            const output = response.json();
            return output;
        }).then(function(data) {
            console.log(data);
        });
    }
}

module.exports = withRouter(Topics);