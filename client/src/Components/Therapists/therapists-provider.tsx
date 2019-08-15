// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { baseGetRequest } from '../../util/base-requests';
import TherapistsCanvas from './therapists-canvas';
import { ITherapistData } from './therapists-interfaces';

interface ITherapistsProviderState {
    therapistData: ITherapistData[],
    filteredTherapistData: ITherapistData[],
    loading: boolean,
    query: string
}

class TherapistsProvider extends React.Component<RouteComponentProps<null>, ITherapistsProviderState> {
    constructor(props: RouteComponentProps<null>) {
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

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;

        this.setState((prevState: any) => {
            const filteredTherapistData = prevState.therapistData.filter((element: any) => {
                return element.title.toLowerCase().includes(query.toLowerCase())
                    || element.desc.toLowerCase().includes(query.toLowerCase())
                    || element.subtitle.toLowerCase().includes(query.toLowerCase())
                    || element.location.toLowerCase().includes(query.toLowerCase());
            });

            return {
                query,
                filteredTherapistData
            };
        });
    };

    render() {
        return (
            <TherapistsCanvas
                filteredTherapistData={this.state.filteredTherapistData}
                loading={this.state.loading}
                query={this.state.query}
                handleInputChange={this.handleInputChange}
            />
        );
    }
}

export default withRouter(TherapistsProvider);