// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import ReactLoading from 'react-loading';

import DataCard from '../DataCard/data-card';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { baseGetRequest } from '../../util/base-requests';
import { getShortenedTimeAndDate } from '../../util/Helpers';
import * as classes from './events.css';
import { SearchBarProvider } from './../SearchBar/search-bar-provider';

import SearchPage from './../SearchPage/search-page';

// TODO: Remove hardcoded images
import event_forum from './../../images/event_forum.png';
import event_picnic from './../../images/event_picnic.jpg';
import event_roundtable from '../../images/event_roundtable.png';

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
    query: string,
    eventData: IEventsData[],
    filteredEventData: IEventsData[],
    loading: boolean
}

class Events extends React.Component<RouteComponentProps<IEventsProps>, IEventsState> {
    constructor(props: RouteComponentProps<IEventsProps>) {
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

    renderEvents = () => {
        return this.state.filteredEventData.map(event => {
            let src = event_forum;
            if (event.title.indexOf("Picnic") >= 0) {
                src = event_picnic;
            }
            else if (event.title.indexOf("Roundtable") >= 0) {
                src = event_roundtable;
            }

            return (
                <DataCard
                    key={event._id}
                    match={{
                        url: 'http://www.google.com',
                        params: {}, isExact: false,
                        path: ''
                    }}
                    src={src}
                    data={{
                        url: '/pages/stuff',
                        title: event.title,
                        subtitle: getShortenedTimeAndDate(new Date(event.date)),
                        secondarySubtitle: event.location,
                        description: event.desc,
                    }}
                />
            );
        });
    };

    render() {
        return (
            <SearchPage
                loading={this.state.loading}
                header={"Upcoming Events"}
                searchBarProps={{
                    placeholder: "Search for events by title, description, or location...",
                    query: this.state.query,
                    handleInputChange: this.handleInputChange
                }}
            >
                {this.renderEvents()}
            </SearchPage>
        );
    }
}

export default withRouter(Events);