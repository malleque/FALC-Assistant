import React from 'react';
import '../Css/SignOut.css'
import { withFirebase } from '../Components/Firebase';

const SignOutButton = ({ firebase }) => (
    <button type="button" onClick={firebase.doSignOut}>
        Sign Out
    </button>
);

export default withFirebase(SignOutButton);