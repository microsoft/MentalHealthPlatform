import React from "react";
import { InfoCardStyles } from "./InfoCardStyles";


export class InfoCard extends React.Component {

    render() {
        return (
            <div style={InfoCardStyles.infoCardContainer}>
                <div style={InfoCardStyles.infoCardCol}>
                    <h1>{this.props.data.title}</h1>
                    <h4>{this.props.data.subtitle}</h4>
                </div>
                <div style={InfoCardStyles.infoCardCol}>
                    <h2>{this.props.data.author}</h2>
                    <p>{this.props.data.date}</p>
                </div>
                <div style={InfoCardStyles.infoCardCol}>
                    <p>{this.props.data.numberOfReplies}</p>
                    <p>{this.props.data.numberOfViews}</p>
                </div>
            </div>
        )
    }
};