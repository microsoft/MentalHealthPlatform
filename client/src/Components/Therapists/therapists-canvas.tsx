// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import DataCard from '../DataCard/data-card';
import { ITherapistData } from './therapists-interfaces';
import SearchPage from './../SearchPage/search-page';
import { LocalizationContext } from './../LocalizationProvider';

// TODO: Remove hardcoded images
import therapist_1 from './../../images/therapist_1.jpg';
import therapist_2 from './../../images/therapist_2.jpg';
import therapist_3 from './../../images/therapist_3.png';

interface ITherapistsCanvasProps {
    filteredTherapistData: ITherapistData[],
    loading: boolean,
    query: string,
    handleInputChange: any
}

const renderTherapists = (filteredTherapistData: ITherapistData[]) => {
    return filteredTherapistData.map(therapist => {
        // TODO: Remove hardcoded names
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
                    url: '',
                    params: {},
                    isExact: false,
                    path: ''
                }}
                src={src}
                data={{
                    url: '/stuff',
                    title: therapist.title,
                    subtitle: therapist.subtitle,
                    description: therapist.desc,
                    rightText: therapist.phone,
                    rightSubText: therapist.location,
                    footer: 'Specializes in: Stress, Trauma, Anxiety' // TODO: Remove hardcoded footer text
                }}
            />
        );
    });
};

const TherapistsCanvas = (props: ITherapistsCanvasProps) => {
    const {
        handleInputChange,
        loading,
        filteredTherapistData,
        query
    } = props;

    const { getLocalizedString } = React.useContext(LocalizationContext);

    return (
        <SearchPage
            loading={loading}
            header={getLocalizedString("THERAPISTS_HEADER")}
            searchBarProps={{
                placeholder: getLocalizedString("THERAPISTS_INPUT_PLACEHOLDER"),
                query,
                handleInputChange
            }}
        >
            {renderTherapists(filteredTherapistData)}
        </SearchPage>
    );
};

export default TherapistsCanvas;