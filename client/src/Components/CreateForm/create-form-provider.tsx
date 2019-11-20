// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import React, { useState } from 'react';

import CreateFormCanvas from './create-form-canvas';
import { FORM_TYPE, ICreateFormParameters } from './create-form-interfaces';
import { basePostRequest } from "./../../util/base-requests";

interface ICreateFormProviderProps {
	createFormParameters: ICreateFormParameters;
	handleSubmitResponseHandler: (data: any) => void;
	handleSubmitErrorHandler: (error: any) => void;
}

export const CreateFormProvider = (props: ICreateFormProviderProps) => {
	const {
		createFormParameters,
		handleSubmitResponseHandler,
		handleSubmitErrorHandler
	} = props;

	const values: string[] = [];

	createFormParameters.fields.forEach(field => {
		switch (field.type) {
			case FORM_TYPE.TEXT_INPUT:
			default:
				const [fieldValue, setFieldValue] = useState("");
				values.push(fieldValue);
				field.onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setFieldValue(e.target.value);
		}		
	});
	
	const submitHandler = () => {
		const postRequestData: { [key: string]: string } = {};
		createFormParameters.fields.forEach((field, i) => {
			postRequestData[field.key] = values[i];
		});
		
		basePostRequest(createFormParameters.requestName, postRequestData, handleSubmitResponseHandler, handleSubmitErrorHandler);
	};

	return (
		<CreateFormCanvas
			createFormParameters={createFormParameters}
			values={values}
			submitHandler={submitHandler}
		/>
	);
};