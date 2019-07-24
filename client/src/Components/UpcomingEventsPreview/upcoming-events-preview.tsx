// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import calendar_icon from './../../images/calendar_icon.png';
import { Header } from './../Dashboard/dashboard.css';
import * as classes from "./upcoming-events-preview.css";

interface IUpcomingEventsPreviewProps {
}

interface IUpcomingEventsData {
    calendarIcon: any;
    eventName: string;
    eventDate: string;
    eventDescription: string;
}

const upcomingEventsData = [
    {
        calendarIcon: calendar_icon,
        eventName: "Monthly Stress Forum",
        eventDate: "July 31, 2019",
        eventDescription: "At building 321, discussion about stress and how it affects our bodies"
    }
];

const UpcomingEvents = (props: IUpcomingEventsPreviewProps) => {
    const {
    } = props;

    return (
        <div>
            <div className={Header}>Upcoming Events</div>
            <div className={classes.UpcomingEventsPreviewDataContainer}>
                <img src={upcomingEventsData[0].calendarIcon} className={classes.UpcomingEventsPreviewImage} />
                <div className={classes.UpcomingEventsPreviewDataText}>
                    <label style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "5px" }}>{upcomingEventsData[0].eventName}</label>
                    <label style={{ fontSize: "16px", marginBottom: "5px" }}>{upcomingEventsData[0].eventDate}</label>
                    <label>{upcomingEventsData[0].eventDescription}</label>
                </div>
                

            </div>
        </div>
    );
};

export default UpcomingEvents;