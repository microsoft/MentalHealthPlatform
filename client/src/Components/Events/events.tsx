// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import DataCard from '../DataCard/data-card';
import { withRouter, RouteComponentProps, match } from 'react-router-dom';
import { baseGetRequest } from '../../util/base-requests';
import { getShortenedTimeAndDate } from '../../util/Helpers';
import * as classes from './events.css';
import searchIcon from '../../images/search_icon.png';

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

    render() {
        return (
            <div style={{ padding: 20 }}>
                <div className={classes.SearchBar}>
                    <input
                        className={classes.TextInput}
                        placeholder="Search for events by title, description, or location..."
                        value={this.state.query}
                        onChange={this.handleInputChange}
                    />
                    <button
                        className={classes.SubmitInput}>
                        <input type="image" src={searchIcon} className={classes.SearchIcon} />
                    </button>
                </div>
                {this.state.filteredEventData.map(event => {
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