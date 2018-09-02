import React from 'react';

import classes from "./Icon.css";
import messageIcon from '../../images/message_icon.png'
import viewIcon from '../../images/view_icon.png';

class Icon extends React.Component {
    renderIcon = (type) => {
        let icon;

        switch (type) {
            case 'replies':
                icon = messageIcon;
                break;
            case 'views':
                icon = viewIcon;
                break;
            default:
                icon = messageIcon;
                break;
        }

        return <img className={classes.Icon} src={icon} />
    }

    render() {
        const { type, number, text } = this.props;

        return (
            <span  className={classes.Container}>
                {this.renderIcon(type)}
                {number && <span className={classes.Text}>{number}</span>}
                {text && <span>{'\u00A0'}{text}</span>}
            </span>
        );
    }
}

export default Icon;