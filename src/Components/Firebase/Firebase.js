import app from 'firebase/app'
import 'firebase/auth';

const config ={
    apiKey: "AIzaSyBoZXkcIGKnnMIR4JJN3iB3ql5DNMQhyMY",
    authDomain: "falc-assistant.firebaseapp.com",
    databaseURL: "https://falc-assistant.firebaseio.com",
    projectId: "falc-assistant",
    storageBucket: "falc-assistant.appspot.com",
    messagingSenderId: "64970348176",
};

class Firebase{
    constructor(){
        app.initializeApp(config);

        this.auth=app.auth();
    }
    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword=(email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
}

export default Firebase;