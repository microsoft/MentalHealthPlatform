// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import React, { useState, useEffect } from "react";

import { baseGetRequest } from "../../util/base-requests";
import UpcomingEventsCanvas from './upcoming-events-preview';

export interface IUpcomingEventData {
    title: string;
    date: string;
    location: string;
    desc: string;
    _id: string;
}

export const UpcomingEventsPreviewProvider = () => {
    const [eventsData, setEventsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const retrieveUpcomingEventsResponseHandler = (data: any) => {
        setEventsData(data && data.events);
        setIsLoading(false);
    }

    const retrieveUpcomingEventsErrorHandler = (error: any) => {
        console.error(error);
        setIsLoading(false);
    }

    const retrieveUpcomingEvents = () => {
        const params = [{}];
        baseGetRequest("getevents", params, retrieveUpcomingEventsResponseHandler, retrieveUpcomingEventsErrorHandler);
    }

    useEffect(() => {
        retrieveUpcomingEvents();
    }, []);

    return (
        <UpcomingEventsCanvas
            eventsData={eventsData}
            isLoading={isLoading}
        />
    );
}