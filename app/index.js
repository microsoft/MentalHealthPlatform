import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './components/App';
import NavigationBar from './components/NavigationBar';
import Topics from './components/Topics';
import SignupLogin from './components/SignupLogin';
import Forum from './components/Forum';

const containerStyle = {
    padding: "25px"
};

ReactDom.render(
	<BrowserRouter>
		<div>
			<NavigationBar />
			<App />
			
			<Route exact path="/" component={Topics}/>
			<Route path="/login" component={SignupLogin} />
			{/* <Route path={`:topicID`} component={Forum} /> */}
			<Route path={`/:topicID`} component={Forum} />
		</div>
	</BrowserRouter>,
	document.getElementById('app')
);