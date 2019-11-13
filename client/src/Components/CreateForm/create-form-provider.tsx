// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import CreateFormCanvas from './create-form-canvas';
import { ICreateFormParameters } from './create-form-interfaces';

interface ICreateFormProviderProps {
	createFormParameters: ICreateFormParameters;
}

export const CreateFormProvider = (props: ICreateFormProviderProps) => {
	return (
		<CreateFormCanvas
			createFormParameters={props.createFormParameters}
		/>
	);
};