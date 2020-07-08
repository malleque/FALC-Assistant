import React from 'react';
import { Nav, Navbar} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import '../Css/Navigbar.css'
import 'bootstrap/dist/css/bootstrap.css';
import Home from '../Views/Home';
import Logo from '../logo_white.svg';

class Navigbar extends React.Component{
    render(){
        return(
            <div>
            <Router>

                    <Switch>
                        <Route path="/Home" component={Home}/>
                    </Switch>

            </Router>
        <Navbar className="navigbar-custom">
            <Navbar.Brand href="#home">
                <img src={Logo} className="navigbar-logo"/> FALC-Assistant
            </Navbar.Brand>
            <Nav classname="navbar-light">
                <Link to={"/Home"}>
                    <Nav.Link href="#accueil">Accueil</Nav.Link>
                </Link>
                <Nav.Link href="#Documents">Mes Documents</Nav.Link>
                <Nav.Link href="#Communauté">Communauté</Nav.Link>
                <Nav.Link href="#Dictionnaire">Dictionnaire</Nav.Link>
                <Nav.Link href="#Utilisateur">Utilisateur</Nav.Link>
            </Nav>
            {/*<Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-light">Search</Button>
                     </Form>*/}
        </Navbar>
            </div>
        );
    }
}
export default Navigbar