import React from 'react';
import '../Css/SignOut.css'
import {Link} from "react-router-dom";
import { withFirebase } from '../Components/Firebase';
import {Nav} from "react-bootstrap";


//Création du bouton pour se déconnecter
const SignOutButton = ({ firebase }) => (
    <Nav.Link onClick={firebase.doSignOut} href="/Settings"><text className="navigbar-text">
        Se déconnecter </text>
    </Nav.Link>
);

export default withFirebase(SignOutButton);