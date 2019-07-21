// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as dateAndTime from 'date-and-time';

export function getShortenedDate(date: Date) {
    return dateAndTime.format(date, "MM/DD/YYYY");
}

export function getShortenedTimeAndDate(date: Date) {
    return dateAndTime.format(date, "h:mm A MM/DD/YYYY").replace("p.m.", "pm").replace("a.m.", "am");
}

export const BASE_URL = `http://127.0.0.1:3000`;