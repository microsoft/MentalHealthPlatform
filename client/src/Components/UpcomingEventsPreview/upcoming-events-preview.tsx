// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import calendar_icon from './../../images/calendar_icon.png';
import { Header } from './../Dashboard/dashboard.css';
import * as classes from "./upcoming-events-preview.css";
import { IUpcomingEventData } from './upcoming-events-preview-provider';
import { getShortenedTimeAndDate } from './../../util/Helpers';

const NUMBER_OF_EVENTS = 1;

interface IUpcomingEventsPreviewProps {
    eventsData: IUpcomingEventData[],
    isLoading: boolean
}

const UpcomingEvents = (props: IUpcomingEventsPreviewProps) => {
    const {
        eventsData,
        isLoading
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

    return isLoading ? (
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
            <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <div className={Header}>Upcoming Events</div>
                <div className={classes.Loading}>
                    <ReactLoading type="bubbles" color="rgb(13, 103, 151)" height={80} width={80} />
                </div>
            </div>
        </div>
        ) : (
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
            <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <div className={Header}>Upcoming Events</div>
                {events}
            </div>
            <Link to={`/events`} style={{ textDecoration:"none", display: "flex", flexGrow: 1 }}>
                <div className={classes.ButtonContainer}>
                    <button className={classes.Button}>View all upcoming events &rarr;</button>
                </div>
            </Link>
        </div>
    );
};

export default UpcomingEvents;