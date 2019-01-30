// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import React from 'react';

import { IconStyles } from './IconStyles';
import messageIcon from '../images/message_icon.png'
import viewIcon from '../images/view_icon.png';

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

        return <img style={IconStyles.iconStyle} src={icon} />
    }

    render() {
        const { type, number, text } = this.props;

        return (
            <span style={IconStyles.containerStyle}>
                {this.renderIcon(type)}
                {number && <span style={IconStyles.textStyle}>{number}</span>}
                {text && <span>{'\u00A0'}{text}</span>}
            </span>
        );
    }
}

export default Icon;