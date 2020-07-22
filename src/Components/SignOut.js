import React from 'react';
import {Link} from "react-router-dom";
import { withFirebase } from '../Components/Firebase';
import {Nav} from "react-bootstrap";


//Création du bouton pour se déconnecter
const SignOutButton = ({ firebase }) => (
    <Nav.Link onClick={firebase.doSignOut} href="/SignIn"><text className="navigbar-text">
        Se déconnecter </text>
    </Nav.Link>
);

export default withFirebase(SignOutButton);