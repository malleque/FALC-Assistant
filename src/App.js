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
import Layout from './Views/Layout';
import ContactForm from "./Views/ContactForm";
import FindPeople from './Views/FindPeople';
import CommunityNew from './Views/CommunityNew';
import CommunityFile from "./Views/CommunityFile";
import CommunityOthers from './Views/CommunityOthers';
import {withAuthentication} from './Components/Session';
import PasswordForget from './Components/PasswordForget';
import Chat from './Views/Chat';
import NewFile from './Views/NewFile';
import firebase from 'firebase';

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
        //"once" implique qu'il va aller le cherche qu'une fois "on" va utiliser à chaque fois qu'il a un changement, la fonction va etre refaite
        //firebase.database().ref('users').on('value', (data)=>{
        //    console.log(data.toJSON());
        //})
        //firebase.database().ref('users/001').update({
        //    name: 'michel'
        //})
        //firebase.database().ref('users/001').remove();
        //firebase.database().ref('users/001').set(
        //    {
        //        name: 'Arnaud',
        //        lastname: 'Dayer'
        //    }
        //).then(()=>{
        //    console.log('INSERTED!')
        //}).catch((error)=>{
        //    console.log('INSERTED!')
        //});

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
                                        <Route path="/Layout" component ={Layout}/>
                                        <Route path="/FindPeople" component ={FindPeople}/>
                                        <Route path="/ContactForm" component ={ContactForm}/>
                                        <Route path="/CommunityO" component ={CommunityOthers}/>
                                        <Route path="/CommunityNew" component ={CommunityNew}/>
                                        <Route path="/CommunityFile" component ={CommunityFile}/>
                                        <Route path="/NewFile" component ={NewFile}/>
                                        <Route path="/Chat" component ={Chat}/>

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
