import React from 'react';
import '../Css/SignOut.css'
import { withFirebase } from '../Components/Firebase';


//Création du boutton pour se déconnecter
const SignOutButton = ({ firebase }) => (
    <button type="button" onClick={firebase.doSignOut}>
        Se déconnecter
    </button>
);

export default withFirebase(SignOutButton);