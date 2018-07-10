import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

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
			<div style={containerStyle}>
				<App />
				<Route exact path="/" render={() => <Redirect to="/topics" />} />
				<Route exact path="/topics" component={Topics}/>
				<Route exact path="/login" component={SignupLogin} />
				<Route exact path={`/topics/topic:topicID`} component={Forum} />
				<Route exact path={`/topics/topic:topicID/:discussionID`} component={Discussion} />
			</div>
		</div>
	</BrowserRouter>,
	document.getElementById('app')
);