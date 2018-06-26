import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './components/App';
import NavigationBar from './components/NavigationBar';
import Topics from './components/Topics';
import SignupLogin from './components/SignupLogin';
import Forum from './components/Forum';
import Discussion from './components/Discussion';

const containerStyle = {
    padding: "25px"
};

ReactDom.render(
	<BrowserRouter>
		<div>
			<NavigationBar />
			<App />
			
			<Route exact path="/" component={Topics}/>
			<Route exact path="/login" component={SignupLogin} />
			<Route exact path={`/topic:topicID`} component={Forum} />
			<Route exact path={`/topic:topicID/Discussion:discussionID`} component={Discussion} />
		</div>
	</BrowserRouter>,
	document.getElementById('app')
);