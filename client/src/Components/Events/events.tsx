// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import DataCard from '../DataCard/data-card';
import { withRouter, RouteComponentProps, match } from 'react-router-dom';
import { baseGetRequest } from '../../util/base-requests';
import { getShortenedTimeAndDate } from '../../util/Helpers';

interface IEventsData {
    _id: string,
    title: string,
    date?: string,
    location?: string
    desc: string,
}

interface IEventsProps { 
    type: string
}

interface IEventsState {
    eventData: IEventsData[],
    loading: boolean
}

class Events extends React.Component<RouteComponentProps<IEventsProps>, IEventsState> {
    constructor(props: RouteComponentProps<IEventsProps>) {
        super(props);
        this.state = {
            eventData: [],
            loading: true
        };
    }

    componentDidMount = () => {
        this.retrieveEvents();
    }

    retrieveEventsResponseHandler = (data: any) => {
        this.setState({
            eventData: data.events,
            loading: false
        });
    }

    retrieveEventsErrorHandler = (error: any) => {
        console.log(error);
    }

    retrieveEvents = () => {
        baseGetRequest("getevents", [], this.retrieveEventsResponseHandler, this.retrieveEventsErrorHandler);
    }

    render() {
        return (
            <div>
                {this.state.eventData.map(event => {
                    return (
                        <DataCard
                        key={event._id}
                        match={{
                            url: 'http://www.google.com',
                            params: {}, isExact: false,
                            path: ''
                        }}
                        data={{
                            url: '/pages/stuff',
                            title: event.title,
                            subtitle: getShortenedTimeAndDate(new Date(event.date)),
                            secondarySubtitle: event.location,
                            description: event.desc,
                        }}
                    />
                    );
                })}
            </div>
        );
    }
}

export default withRouter(Events);