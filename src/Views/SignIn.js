import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Components/Firebase';
import '../Css/SignIn.css'
import button from "react-bootstrap/Button";

var e = new Error("Le mot de passe est incorrect ou l'adresse mail n'existe pas.");

const SignInPage = () => (
    <div>
        <h1>Bienvenue sur le FALC Assistant!</h1>
        <h2>Se connecter</h2>
        <SignInForm />
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
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
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Mail"
                />
                <br/>
                <input
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Mot de passe"
                />
                <br/>
                <Link to={"/SignUp"}>
                    <button type="button"
                            className="btn btn-primary btn-lg"
                    >S'inscrire
                    </button>
                </Link>
                <button disabled={isInvalid} type="submit" className="btn btn-primary btn-lg">
                    Se connecter
                </button>


                {error && <p>{e.message}</p>}
            </form>
        );
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };