// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from "react";

import { baseGetRequest } from "../../util/base-requests";
import UpcomingEventsCanvas from './upcoming-events-preview';

export interface IUpcomingEventData {
    title: string;
    date: string;
    location: string;
    desc: string;
    _id: string;
}

interface IUpcomingEventsPreviewProviderProps {
}

interface IUpcomingEventsPreviewProviderState {
    eventsData: IUpcomingEventData[],
    isLoading: boolean;
}

export class UpcomingEventsPreviewProvider extends React.Component<IUpcomingEventsPreviewProviderProps, IUpcomingEventsPreviewProviderState> {
    constructor(props: IUpcomingEventsPreviewProviderProps) {
        super(props);
        this.state = {
            eventsData: [],
            isLoading: true
        };
    }

    render = () => {
        return (
            <UpcomingEventsCanvas
                eventsData={this.state.eventsData}
                isLoading={this.state.isLoading}
            />
        );
    }

    componentDidMount = () => {
        this.retrieveUpcomingEvents();
    }

    retrieveUpcomingEventsResponseHandler = (data: any) => {
        this.setState({
            eventsData: data && data.events,
            isLoading: false
        });
    }

    retrieveUpcomingEventsErrorHandler = (error: any) => {
        console.error(error);
        this.setState({
            isLoading: false
        });
    }

    retrieveUpcomingEvents = () => {
        const params = [{}];
        baseGetRequest("getevents", params, this.retrieveUpcomingEventsResponseHandler, this.retrieveUpcomingEventsErrorHandler);
    }
}