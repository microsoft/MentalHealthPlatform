// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import React, { useState, useEffect } from "react";

import { baseGetRequest } from "../../util/base-requests";
import NewsPreviewCanvas from "./news-preview";

export const NewsPreviewProvider = () => {
    const [newsData, setNewsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const retrieveNewsResponseHandler = (data: any) => {
        setNewsData(data && data.news);
        setIsLoading(false);
    }

    const retrieveNewsErrorHandler = (error: any) => {
        console.error(error);
        setIsLoading(false);
    }

    const retreiveNews = () => {
        const params = [{}];
        baseGetRequest("getnews", params, retrieveNewsResponseHandler, retrieveNewsErrorHandler);
    }

    useEffect(() => {
        retreiveNews();
    }, []);

    return (
        <NewsPreviewCanvas
            newsData={newsData}
            isLoading={isLoading}
        />
    );
}