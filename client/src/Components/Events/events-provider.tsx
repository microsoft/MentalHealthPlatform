// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { baseGetRequest } from '../../util/base-requests';
import EventsCanvas from './events-canvas';

const Events = () => {
    const [query, setQuery] = useState("");
    const [eventData, setEventData] = useState([]);
    const [filteredEventData, setFilteredEventData] = useState([]);
    const [loading, setLoading] = useState(true);

    const retrieveEventsResponseHandler = (data: any) => {
        setEventData(data.events);
        setFilteredEventData(data.events);
        setLoading(false);
    }

    const retrieveEventsErrorHandler = (error: any) => {
        console.log(error);
    }

    const retrieveEvents = () => {
        baseGetRequest("getevents", [], retrieveEventsResponseHandler, retrieveEventsErrorHandler);
    }

    const handleInputChange = (event: any) => {
        const query = event.target.value;
        setQuery(query);

        const filteredEventData = eventData.filter((element: any) => {
            const queryInLowerCase = query.toLowerCase();
            return element.title.toLowerCase().includes(queryInLowerCase) 
                || element.desc.toLowerCase().includes(queryInLowerCase)
                || element.location.toLowerCase().includes(queryInLowerCase);
        });
        setFilteredEventData(filteredEventData);
    };

    useEffect(() => {
        retrieveEvents();
    }, []);

    return (
        <EventsCanvas
            loading={loading}
            handleInputChange={handleInputChange}
            query={query}
            filteredEventData={filteredEventData}
        />
    );
}

export default withRouter(Events);