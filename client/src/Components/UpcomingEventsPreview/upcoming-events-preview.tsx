// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import calendar_icon from './../../images/calendar_icon.png';
import { Header } from './../Dashboard/dashboard.css';
import * as classes from "./upcoming-events-preview.css";
import { IUpcomingEventData } from './upcoming-events-preview-provider';
import { getShortenedTimeAndDate } from './../../util/Helpers';

const NUMBER_OF_EVENTS = 1;

interface IUpcomingEventsPreviewProps {
    eventsData: IUpcomingEventData[]
}

const UpcomingEvents = (props: IUpcomingEventsPreviewProps) => {
    const {
        eventsData
    } = props;    

    const events = [];
    for (let i = 0; i < Math.min(NUMBER_OF_EVENTS, eventsData.length); i++) {
        events.push(
            <div key={i} className={classes.UpcomingEventsPreviewDataContainer}>
                <img src={calendar_icon} className={classes.UpcomingEventsPreviewImage} />
                <div className={classes.UpcomingEventsPreviewDataText}>
                    <label style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "5px" }}>{eventsData[0].title}</label>
                    <label style={{ fontSize: "16px", marginBottom: "5px" }}>{getShortenedTimeAndDate(new Date(eventsData[0].date))}</label>
                    <label>{eventsData[0].desc}</label>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className={Header}>Upcoming Events</div>
            {events}
        </div>
    );
};

export default UpcomingEvents;