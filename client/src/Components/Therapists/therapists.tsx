// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import ReactLoading from 'react-loading';

import DataCard from '../DataCard/data-card';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { baseGetRequest } from '../../util/base-requests';
import * as classes from './therapists.css';
import SearchBar from './../SearchBar/search-bar-provider';

// TODO: Remove hardcoded images
import therapist_1 from './../../images/therapist_1.jpg';
import therapist_2 from './../../images/therapist_2.jpg';
import therapist_3 from './../../images/therapist_3.png';

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
            <div style={{ padding: 20 }}>
                <h1 className={classes.Header}>Therapists</h1>
                <SearchBar
                    placeholder={"Search for therapists by name, title, location, or description"}
                    handleInputChange={this.handleInputChange}
                    query={this.state.query}
                />
                {this.state.loading ? (
                    <div className={classes.Loading}>
                        <ReactLoading type="bubbles" color="rgb(13, 103, 151)" height={'5%'} width={'5%'} />
                    </div>
                ) :
                this.state.filteredTherapistData.map(therapist => {
                    let src = therapist_1;
                    if (therapist.title.indexOf("Samantha") >= 0) {
                        src = therapist_2;
                    }
                    else if (therapist.title.indexOf("Tim") >= 0) {
                        src = therapist_3;
                    }
                    return (
                        <DataCard
                            key={therapist._id}
                            match={{
                                url: 'http://www.google.com',
                                params: {}, isExact: false,
                                path: ''
                            }}
                            src={src}
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