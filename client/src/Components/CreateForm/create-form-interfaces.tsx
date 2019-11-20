// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

export enum FORM_TYPE {
	TEXT_INPUT
}

export interface ICreateFormFields {
	key: string;
	type: FORM_TYPE;
	description: string;
	onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ICreateFormParameters {
	requestName: string;
	header: string;
	fields: ICreateFormFields[];
}

export interface ICreateFormCanvasProps {
	createFormParameters: ICreateFormParameters;
	values: string[];
	submitHandler: () => void;
}