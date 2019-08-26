// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { baseGetRequest } from '../../util/base-requests';
import TherapistsCanvas from './therapists-canvas';

const TherapistsProvider = () => {
    const [query, setQuery] = useState("");
    const [therapistsData, setTherapistsData] = useState([]);
    const [filteredTherapistData, setFilteredTherapistData] = useState([]);
    const [loading, setLoading] = useState(true);

    const retrieveTherapistsResponseHandler = (data: any) => {
        setTherapistsData(data.therapists);
        setFilteredTherapistData(data.therapists);
        setLoading(false);
    }

    const retrieveTherapistsErrorHandler = (error: any) => {
        console.log(error);
    }

    const retrieveTherapists = () => {
        baseGetRequest("gettherapists", [], retrieveTherapistsResponseHandler, retrieveTherapistsErrorHandler);
    }

    useEffect(() => {
        retrieveTherapists();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setQuery(query);

        const filteredTherapistData = therapistsData.filter((element: any) => {
            const queryToLowerCase = query.toLowerCase();
            return element.title.toLowerCase().includes(queryToLowerCase)
                || element.desc.toLowerCase().includes(queryToLowerCase)
                || element.subtitle.toLowerCase().includes(queryToLowerCase)
                || element.location.toLowerCase().includes(queryToLowerCase);
        });
        setFilteredTherapistData(filteredTherapistData);
    };

    return (
        <TherapistsCanvas
            filteredTherapistData={filteredTherapistData}
            loading={loading}
            query={query}
            handleInputChange={handleInputChange}
        />
    );
}

export default withRouter(TherapistsProvider);