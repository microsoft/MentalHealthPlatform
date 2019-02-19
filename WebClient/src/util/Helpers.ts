// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

export function formatDate(timestamp) {
    const d = new Date(timestamp);

    const month = d.getMonth();
    const day = d.getDate() >= 10 ? d.getDate().toString() : "0" + d.getDate().toString();
    const year = d.getFullYear().toString().substr(-2);

    const hour = d.getHours() % 12;
    const minute = d.getMinutes();

    const amPm = d.getHours() >= 12 ? "pm" : "am"

    return `${hour}:${minute} ${amPm} ${month}/${day}/${year}`;
}

export const BASE_URL = `http://127.0.0.1:3000`;