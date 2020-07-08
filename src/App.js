import React from 'react';
import button from 'react-bootstrap/Button';
import Bar from './Components/Navigbar.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Form, Button} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Login from './Views/Login';
import Home from './Views/Home';
import Files from './Views/Files';
import Community from './Views/Community';
import Settings from "./Views/Settings";
import SignUp from "./Views/SignUp";
function App() {
  return (
    <div className="App">
        <header  className="App-header">
            <Router>
                <Bar/>
                <div className="App">
                    <Switch>
                        <Route path="/" exact>
                            <Index/>
                        </Route>
                        <Route path="/Login" component={Login}/>
                        <Route path="/Home" component={Home}/>
                        <Route path="/Files" component ={Files}/>
                        <Route path="/Settings" component ={Settings}/>
                        <Route path="/Community" component ={Community}/>
                        <Route path="/SignUp" component ={SignUp}/>

                    </Switch>
                </div>
            </Router>
        </header>
    </div>);
}
function Index() {
    return (
        <div className="App">
            <header className="App-header-title">
                <h1>
                    Bienvenue sur le FALC-Assistant !
                </h1>
            </header>

            <body className="App-body">
            <Form>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <div class="text-right" className="button-connect">
                    <Button type="submit" className="btn btn-primary btn-lg">
                        Se connecter
                    </Button>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <Link to={"/SignUp"}>
                        <button type="button"
                                className="btn btn-primary btn-lg"
                        >Inscription
                        </button>
                    </Link>
                </div>
            </Form>
            </body>
        </div>
    );
}
export default App;
