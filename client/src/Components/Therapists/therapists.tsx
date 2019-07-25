// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import DataCard from '../DataCard/data-card';
import { withRouter, RouteComponentProps, match } from 'react-router-dom';
import { baseGetRequest } from '../../util/base-requests';

interface ITherapistsProps {
}

interface ITherapistData {
    _id: string,
    title: string,
    subtitle?: string,
    desc: string,
    phone: string,
    location: string
}

interface ITherapistsProps {
    type: string
}

interface ITherapistsState {
    therapistData: ITherapistData[],
    filteredTherapistData: ITherapistData[],
    loading: boolean,
    query: string
}

class Therapists extends React.Component<RouteComponentProps<ITherapistsProps>, ITherapistsState> {
    constructor(props: RouteComponentProps<ITherapistsProps>) {
        super(props);
        this.state = {
            query: "",
            therapistData: [],
            filteredTherapistData: [],
            loading: true
        };
    }

    componentDidMount = () => {
        this.retrieveTherapists();
    }

    retrieveTherapistsResponseHandler = (data: any) => {
        this.setState({
            therapistData: data.therapists,
            filteredTherapistData: data.therapists,
            loading: false
        });
    }

    retrieveTherapistsErrorHandler = (error: any) => {
        console.log(error);
    }

    retrieveTherapists = () => {
        baseGetRequest("gettherapists", [], this.retrieveTherapistsResponseHandler, this.retrieveTherapistsErrorHandler);
    }

    handleInputChange = (event: any) => {
        const query = event.target.value;

        this.setState((prevState: any) => {
            const filteredTherapistData = prevState.therapistData.filter((element: any) => {
                return element.title.toLowerCase().includes(query.toLowerCase())
                    || element.desc.toLowerCase().includes(query.toLowerCase());
            });

            return {
                query,
                filteredTherapistData
            };
        });
    };

    render() {
        return (
            <div>
                <form>
                    <input
                        placeholder="Search for..."
                        value={this.state.query}
                        onChange={this.handleInputChange}
                    />
                </form>
                {this.state.filteredTherapistData.map(therapist => {
                    return (
                        <DataCard
                            key={therapist._id}
                            match={{
                                url: 'http://www.google.com',
                                params: {}, isExact: false,
                                path: ''
                            }}
                            data={{
                                url: '/pages/stuff',
                                title: therapist.title,
                                subtitle: therapist.subtitle,
                                description: therapist.desc,
                                rightText: therapist.phone,
                                rightSubText: therapist.location,
                                footer: 'Specializes in: Stress, Trauma, Anxiety'
                            }}
                        />
                    );
                })}
            </div>
        );
    }
}

export default withRouter(Therapists);