import React from "react";
import firebase from "firebase";
function GetUser(email){
    var sender;
    const user = [];
    firebase.database().ref().child('users').on('value', data =>{
        console.log(data.val());
        sender=data.toJSON();

        Object.keys(sender).forEach(function(key){

            if(sender[key].email===localStorage.getItem("sender")){
                user.push(sender[key]);
            }
            return user;
        });
    });

}
export default GetUser;