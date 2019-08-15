// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { baseGetRequest } from '../../util/base-requests';
import { IEventsData } from './events-interfaces';
import EventsCanvas from './events-canvas';

interface IEventsState {
    query: string,
    eventData: IEventsData[],
    filteredEventData: IEventsData[],
    loading: boolean
}

class Events extends React.Component<RouteComponentProps<null>, IEventsState> {
    constructor(props: RouteComponentProps<null>) {
        super(props);
        this.state = {
            query: "",
            eventData: [],
            filteredEventData: [],
            loading: true
        };
    }

    componentDidMount = () => {
        this.retrieveEvents();
    }

    retrieveEventsResponseHandler = (data: any) => {
        this.setState({
            eventData: data.events,
            filteredEventData: data.events,
            loading: false
        });
    }

    retrieveEventsErrorHandler = (error: any) => {
        console.log(error);
    }

    retrieveEvents = () => {
        baseGetRequest("getevents", [], this.retrieveEventsResponseHandler, this.retrieveEventsErrorHandler);
    }

    handleInputChange = (event: any) => {
        const query = event.target.value;

        this.setState((prevState: any) => {
            const filteredEventData = prevState.eventData.filter((element: any) => {
                return element.title.toLowerCase().includes(query.toLowerCase()) 
                || element.desc.toLowerCase().includes(query.toLowerCase())
                || element.location.toLowerCase().includes(query.toLowerCase());
            });

            return {
                query,
                filteredEventData
            };
        });
    };

    render() {
        return (
            <EventsCanvas
                loading={this.state.loading}
                handleInputChange={this.handleInputChange}
                query={this.state.query}
                filteredEventData={this.state.filteredEventData}
            />
        );
    }
}

export default withRouter(Events);