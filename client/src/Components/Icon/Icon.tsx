// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import * as classes from "./Icon.css";
import messageIcon from '../../images/message_icon.png'
import viewIcon from '../../images/view_icon.png';

export interface IIconProps {
    type: string;
    count: number;
    text: string;
}

export class Icon extends React.Component<IIconProps, {}> {
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

    render = () => {
        const { type, count, text } = this.props;

        return (
            <span  className={classes.Container}>
                {this.renderIcon(type)}
                {count && <span className={classes.Text}>{count}</span>}
                {text && <span>{'\u00A0'}{text}</span>}
            </span>
        );
    }
}