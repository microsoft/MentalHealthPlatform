import { BASE_URL } from "./Helpers";

type GetRequestParams = {
	[key: string]: string
}

export const baseGetRequest = (path: string, params: GetRequestParams[], responseHandler: (data: any) => void, errorHandler: (error: any) => void) => {
	let url = `${BASE_URL}/${path}?`;
	for (let i = 0; i < params.length; i++) {
		if (i > 0) {
			url += '&';
		}
		const key = Object.keys(params[i])[0];
		const value = params[i][key];
		url += `${key}=${value}`;
	}

	fetch(url, {
			method: 'GET',
			headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
			}
	}).then(response => response.json()
	).then(data => {
			responseHandler(data);
	}).catch(error => {
			errorHandler(error);
	});
};

export const basePostRequest = (path: string, data: any, responseHandler: (data: any) => void, errorHandler: (error: any) => void) => {
	fetch(`${BASE_URL}/${path}`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data)
	}).then(response => response.json()
	).then(data => {
		responseHandler(data);
	}).catch(error => {
		errorHandler(error);
	});
};