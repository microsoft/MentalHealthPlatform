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

const UserContext = React.createContext({
    user: {},
    updateUser: () => {}
});

class UserProvider extends React.Component {
    constructor(props) {
        super(props);
        this.updateUser = (userData) => {
            console.log("updating user");
            this.setState(state => ({
                user: {
                    userId: userData.userId,
                    username: userData.username
                }
            }));
        };
        this.state = {
            user: {
                userId: -1,
                username: ""
            },
            updateUser: this.updateUser
        };
    }

    render() {
        return (
            <UserContext.Provider value={this.state}>
                <BrowserRouter>
                    <div>
                        <NavigationBar UserContext={UserContext} />
                        <div>
                            <Route exact path="/" render={() => <Redirect to="/topics" />} />
                            <Route exact path="/topics" component={() => <Topics UserContext={UserContext} />} />
                            <Route exact path="/login" component={() => <SignupLogin UserContext={UserContext} />} />
                            <Route exact path={`/topics/topic:topicID`} component={() => <Forum UserContext={UserContext} />} />
                            <Route exact path={`/topics/topic:topicID/chat/:chatID`} component={() => <Chat UserContext={UserContext} />} />
                            <Route exact path={`/topics/topic:topicID/createChat`} component={() => <CreateChat UserContext={UserContext} />} />
                        </div>
                    </div>
                </BrowserRouter>
            </UserContext.Provider>
        );
    }
}

class App extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    /**
     * Renders overall application component
     * @return  {React.Component}   Rendered component
     */
    render() {
        return (
            <UserProvider>
                <UserContext.Consumer>
                    {(context) => context.user}
                </UserContext.Consumer>
            </UserProvider>
        );
    }
}

module.exports = UserProvider;