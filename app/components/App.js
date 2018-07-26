import React from 'react';
// import { NavLink, withRouter } from 'react-router-dom';
import { BrowserRouter, Route, NavLink, IndexRoute, hashHistory, browserHistory, withRouter, Redirect } from 'react-router-dom';

import NavigationBar from './NavigationBar';
import Topics from './Topics';
import SignupLogin from './SignupLogin';
import Forum from './Forum/Forum';
import Chat from './Chat';   
import CreateChat from './CreateChat'; 

import AppStyles from "./AppStyles";

class App extends React.Component {
    /**
     * Renders overall application component
     * @return  {React.Component}   Rendered component
     */
    render() {
        return (
            <BrowserRouter>
                <div>
                    <NavigationBar />
                    <div>
                        <Route exact path="/" render={() => <Redirect to="/topics" />} />
                        <Route exact path="/topics" component={Topics}/>
                        <Route exact path="/login" component={SignupLogin} />
                        <Route exact path={`/topics/topic:topicID`} component={Forum} />
                        <Route exact path={`/topics/topic:topicID/chat/:chatID`} component={Chat} />
                        <Route exact path={`/topics/topic:topicID/createChat`} component={CreateChat} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

module.exports = App;