import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {compose} from 'recompose';
import {withFirebase} from '../Components/Firebase'
import '../Css/SignUp.css'
import button from "react-bootstrap/Button";
import firebase from "firebase";
var e = new Error("Cette adresse mail possède déjà un compte. Merci de vous connecter.");
const SignUpPage = () => (
    <div>
        <h1>Bienvenue sur le FALC Assistant!</h1>
        <h2>Inscription</h2>
        <SignUpForm/>
    </div>
);

const INITIAL_STATE = {
    name: '',
    lastname: '',
    email: '',
    tarif: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { name, lastname, email, tarif, passwordOne } = this.state;

        firebase.database().ref('users/002').set(
            {
                name: name,
                lastname: lastname,
                email: email,
                tarif: tarif
            }
        ).then(()=>{
            console.log('INSERTED!')
        }).catch((error)=>{
            console.log('INSERTED!')
        });
        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push("/Home");
                window.location.reload();
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            name,
            lastname,
            email,
            tarif,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;
        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            tarif === '' ||
            email === '' ||
            lastname === '' ||
            name === '';
        return(
            <form onSubmit={this.onSubmit}>
                <input
                    name="name"
                    value={name}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Prénom"
                />
                <br/>
                <input
                    name="lastname"
                    value={lastname}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Nom"
                />
                <br/>
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email"
                />
                <br/>
                <input
                    name="tarif"
                    value={tarif}
                    onChange={this.onChange}
                    type="number"
                    placeholder="Tarif"
                />
                <br/>
                <input
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Mot de passe"
                />
                <br/>
                <input
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirmation"
                />
                <br/>
                <button disabled={isInvalid} type="submit" className="btn btn-primary btn-lg">S'inscrire</button>
                <Link to={"/"}>
                    <button type="button"
                            className="btn btn-primary btn-lg"
                    >Se connecter
                    </button>
                </Link>

                {error && <p>{e.message}</p>}
            </form>
        );
    }
}

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm};
