import * as React from 'react';
import * as ReactDom from 'react-dom';

import { UserProvider } from './Components/App';

ReactDom.render(
	<UserProvider />,
	document.getElementById('app')
);