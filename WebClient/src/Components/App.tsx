import * as React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import { NavigationBar } from './Navigation/NavigationBar';
import {Topics} from './Topics/Topics';
import {SignupLogin} from './SignupLogin/SignupLogin';
import { Forum } from './Forum/Forum';
import { Chat } from './Chat/Chat';   
import { CreateChat } from './Chat/CreateChat'; 

const UserContext = React.createContext({
    user: {},
    updateUser: () => {}
});

export class UserProvider extends React.Component<{}, {user: any, updateUser: any}> {

    private updateUser = (userData) => {
        console.log("updating user");
        this.setState(() => ({
            user: {
                userId: userData.userId,
                username: userData.username
            }
        }));
    };

    constructor(props) {
        super(props);
        
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