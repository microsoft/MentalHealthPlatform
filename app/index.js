import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router-dom';

import App from './components/App';

ReactDom.render(
	<App />,
	document.getElementById('app')
);