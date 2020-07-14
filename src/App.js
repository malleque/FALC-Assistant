import React, {Component} from 'react';
import Bar from './Components/Navigbar.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Home from './Views/Home';
import Files from './Views/Files';
import Community from './Views/Community';
import Settings from "./Views/Settings";
import SignUp from "./Views/SignUp";
import SignIn from './Views/SignIn';
import File from './Views/File';
import {withAuthentication} from './Components/Session';
import PasswordForget from './Components/PasswordForget';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};
function Index(){
    return(
        <Redirect to='/SignIn'/>
    );
}
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authUser: null,
        };
    }
    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
            authUser
                ? this.setState({ authUser })
                : this.setState({ authUser: null });
        });
    }
    componentWillUnmount() {
        this.listener();
    }
        render(){
        if(this.state.authUser)
                return (
                    <div className="App">
                        <header  className="App-header">
                            <Router>
                                <Bar/>
                                <div className="App">
                                    <Switch>
                                        <Route path="/Home" component={Home}/>
                                        <Route path="/Files" component ={Files}/>
                                        <Route path="/Settings" component ={Settings}/>
                                        <Route path="/Community" component ={Community}/>
                                        <Route path="/File" component ={File}/>


                                    </Switch>
                                </div>
                            </Router>
                        </header>
                    </div>
                );
            return (
                <div className="App">
                    <header  className="App-header">
                        <Router>
                            <div className="App">
                                <Switch>
                                    <Route path="/" exact>
                                        <Index/>
                                    </Route>
                                    <Route path="/SignUp" component ={SignUp}/>
                                    <Route path="/SignIn" component ={SignIn}/>
                                    <Route path="/PasswordForget" component ={PasswordForget}/>

                                </Switch>
                            </div>
                        </Router>
                    </header>
                </div>);

        }
    }


export default withAuthentication(App);
