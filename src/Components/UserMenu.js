import React from 'react';
import SignOutButton from "./SignOut";
import {DropdownButton, Dropdown} from "react-bootstrap";
//Non utilisé
//Récupération du nom d'utilisateur
var username = localStorage.getItem('email');
if(username === null)
    username=username;
else
username = username.substring(0, username.indexOf('@'));

function UserMenu(){
    return(
        <DropdownButton id="dropdown-basic-button" title={username}>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="/SignIn" ><SignOutButton/></Dropdown.Item>
        </DropdownButton>
    );

}
export default UserMenu;