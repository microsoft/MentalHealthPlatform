// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

export enum FORM_TYPE {
	TEXT_INPUT
}

export interface IInputData {
	key: string;
	type: FORM_TYPE;
	description: string;
};

export interface ICreateFormFields {
	key: string;
	type: FORM_TYPE;
	description: string;
}

export interface ICreateFormParameters {
	header: string;
	fields: ICreateFormFields[];
}

export interface ICreateFormCanvasProps {
	createFormParameters: ICreateFormParameters;
}