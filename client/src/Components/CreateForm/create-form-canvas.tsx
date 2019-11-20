// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import * as classes from "./create-form.css";
import {
	FORM_TYPE,
	ICreateFormFields,
	ICreateFormCanvasProps
} from './create-form-interfaces';
import { LocalizationContext } from './../LocalizationProvider';

const renderTextInput = (inputData: ICreateFormFields, value: string, index: number) => {	
	return (
		<input
			key={index}
			className={classes.TextInput}
			placeholder={inputData.description}
			value={value}
			onChange={inputData.onChangeHandler}
		/>
	);
};

const renderButton = (submitHandler: () => void) => {
	const { getLocalizedString } = React.useContext(LocalizationContext);
	return (
		<button onClick={submitHandler} className={classes.SubmitButton}>
			{getLocalizedString("CREATE_FORM_SUBMIT")}
		</button>
	);
}

const CreateForm = (props: {children: any}) => {	
	return <div className={classes.CreateForm}>{props.children}</div>;
};

const CreateFormCanvas = (props: ICreateFormCanvasProps) => {
	const { createFormParameters, values, submitHandler } = props;
	
	const header = <h2 className={classes.CreateFormTitle}>{createFormParameters.header}</h2>;

	const fields = createFormParameters.fields && createFormParameters.fields.map((input, i) => {
			switch (input.type) {
					case FORM_TYPE.TEXT_INPUT:
					default:
							return renderTextInput(input, values[i], i);
			}
	});

	const button = renderButton(submitHandler);

	return (
		<CreateForm>
			{header}
			{fields}
			{button}
		</CreateForm>
	);
};

export default CreateFormCanvas;