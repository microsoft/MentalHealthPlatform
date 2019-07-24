// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import * as classes from "./icon.css";
import messageIcon from '../../images/message_icon.png'
import viewIcon from '../../images/view_icon.png';

export interface IIconProps {
    type: string;
    count: number;
    text: string;
}

const renderIcon = (type: string) => {
    let icon;

    switch (type) {
        case 'views':
            icon = viewIcon;
            break;
        case 'replies':
        default:
            icon = messageIcon;
            break;
    }

    return <img className={classes.Icon} src={icon} style={{ display: "table-cell" }} />
}

const Icon = (props: IIconProps) => {
    const { type, count, text } = props;

    return (        
        <tr>
            <td className={classes.TableCell}>{renderIcon(type)}</td>
            <td className={classes.TableCell} style={{ textAlign: "end" }}>{count != undefined ? count : null}</td>
            <td className={classes.TableCell}>{text}</td>
        </tr>
    );
}

export default Icon;