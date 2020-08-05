import React from 'react';
import { Nav, Navbar} from 'react-bootstrap';
import {BrowserRouter as Link, withRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../Css/Navigbar.css'
import Logo from '../logo_white.svg';
import SignOutButton from './SignOut';
import UserMenu from './UserMenu';
import firebase from 'firebase';

var user;
class Navigbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            arr: [],
        }
    }
    render(){
        var arrUser= this.state.arr;

        return(
            <div>
        <Navbar className="navigbar-custom">
            <Navbar.Brand href="/Home">
                <img src={Logo} className="navigbar-logo"/> <text className="navigbar-text">FALC-Assistant</text>
            </Navbar.Brand>
            <Nav>
                <li>
                <Nav.Link href="/Files"><text className="navigbar-text">Mes documents</text></Nav.Link>
                </li>
                <li>
                <Nav.Link href="/CommunityO"><text className="navigbar-text">Mes relectures</text></Nav.Link>
                </li>
                <li>
                    <Nav.Link href="/Settings"><text className="navigbar-text">Règles FALC</text></Nav.Link>
                </li>
                <li>
                    <SignOutButton/>
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
