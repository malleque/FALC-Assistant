import React from 'react';
import button from 'react-bootstrap/Button';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Bar from './Components/Navigbar.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Login from "./Views/Login";
import Home from "./Views/Home";
function App() {
  return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact>
              <Index/>
            </Route>

            <Route path="/Login" component={Login}/>
            <Route path="/Home" component={Home}/>
          </Switch>
        </div>
      </Router>
  );
}
function Index(){
  return(
      <div className="App">
        <Bar/>

        <header className="App-header">
          <h1>
            Bienvenue sur le FALC-Assistant !
          </h1>
          <div>
            <Link to={"/Login"}>
              <button class="button"
                      type="button"
                      className="btn btn-primary btn-lg"
              >Connexion</button>
            </Link>
            &nbsp;
            <Link to={"/Home"}>
              <button class={"button"}
                      type="button"
                      className="btn btn-primary btn-lg"
              >Inscription</button>
            </Link>
          </div>
        </header>

        <body className="App-body">
        <a>Le falc assistant est une aide pour l'écriture en falc. <br/>
          Vous trouverez sur ce site : <br/>
          1) une page avec vos différents documents<br/>
          2) une page de modification avec les erreurs des textes.<br/>
          3)une page communautaire pour la relecture
        </a>
        </body>
      </div>
  );
}
export default App;
