// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import * as ReactDom from 'react-dom';

import { UserProvider } from './Components/App';

ReactDom.render(
	<UserProvider />,
	document.getElementById('app')
);