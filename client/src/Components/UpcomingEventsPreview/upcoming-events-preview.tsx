// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import calendar_icon from './../../images/calendar_icon.png';
import * as classes from "./upcoming-events-preview.css";
import { IUpcomingEventData } from './upcoming-events-preview-provider';
import { getShortenedTimeAndDate } from './../../util/Helpers';
import DashboardTile from './../DashboardTile/dashboard-tile';

const NUMBER_OF_EVENTS = 1;

interface IUpcomingEventsPreviewProps {
    eventsData: IUpcomingEventData[],
    isLoading: boolean
}

const renderEvents = (eventsData: IUpcomingEventData[]) => {
    return eventsData.slice(0, NUMBER_OF_EVENTS).map((data, i) => {
        return (
            <div key={i} className={classes.UpcomingEventsPreviewDataContainer}>
                <img src={calendar_icon} className={classes.UpcomingEventsPreviewImage} />
                <div className={classes.UpcomingEventsPreviewDataText}>
                    <label style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "5px" }}>{eventsData[0].title}</label>
                    <label style={{ fontSize: "16px", marginBottom: "5px" }}>{getShortenedTimeAndDate(new Date(eventsData[0].date))}</label>
                    <label>{eventsData[0].desc}</label>
                </div>
            </div>
        );
    });
};

const UpcomingEvents = (props: IUpcomingEventsPreviewProps) => {
    const {
        eventsData,
        isLoading
    } = props;

    return (
        <DashboardTile
            buttonProps={{
                link: `/events`,
                label: `View all upcoming events \u2192`,
                isBlueBackground: false,
                isCentered: false
            }}
            header={"Upcoming Events"}
            isLoading={isLoading}
        >
            {renderEvents(eventsData)}
        </DashboardTile>
    );
};

export default UpcomingEvents;