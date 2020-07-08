import React from 'react';
import { Nav, Navbar} from 'react-bootstrap';
import {BrowserRouter as Link, withRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../Css/Navigbar.css'
import Logo from '../logo_white.svg';
import SignOutButton from '../Views/SignOut';

class Navigbar extends React.Component{
    render(){
        return(
            <div>
        <Navbar className="navigbar-custom">
            <Navbar.Brand href="/Home">
                <img src={Logo} className="navigbar-logo"/> <text className="navigbar-text">FALC-Assistant</text>
            </Navbar.Brand>
            <Nav>
                <li>
                <Nav.Link href="/Home"><text className="navigbar-text">Accueil</text></Nav.Link>
                </li>
                <li>
                <Nav.Link href="./Files"><text className="navigbar-text">Mes Documents</text></Nav.Link>
                </li>
                <li>
                <Nav.Link href="/Community"><text className="navigbar-text">Communauté</text></Nav.Link>
                </li>
                <li>
                    <Nav.Link href="/SignIn"><SignOutButton className="navigbar-button"/></Nav.Link>
                </li>
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
export default Navigbar;
