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
    loading: boolean
}

class Therapists extends React.Component<RouteComponentProps<ITherapistsProps>, ITherapistsState> {
    constructor(props: RouteComponentProps<ITherapistsProps>) {
        super(props);
        this.state = {
            therapistData: [],
            loading: true
        };
    }

    componentDidMount = () => {
        this.retrieveTherapists();
    }

    retrieveTherapistsResponseHandler = (data: any) => {
        this.setState({
            therapistData: data.therapists,
            loading: false
        });
    }

    retrieveTherapistsErrorHandler = (error: any) => {
        console.log(error);
    }

    retrieveTherapists = () => {
        baseGetRequest("gettherapists", [], this.retrieveTherapistsResponseHandler, this.retrieveTherapistsErrorHandler);
    }

    render() {
        return (
            <div>
                {this.state.therapistData.map(therapist => {
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