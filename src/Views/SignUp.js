import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {compose} from 'recompose';
import {withFirebase} from '../Components/Firebase'
import '../Css/SignUp.css'
import {button, Col, Form} from "react-bootstrap";
var e = new Error("Cette adresse mail possède déjà un compte. Merci de vous connecter.");
const SignUpPage = () => (
    <div>
        <h1>Bienvenue sur le FALC Assistant!</h1>
        <h2>Inscription</h2>
        <SignUpForm/>
    </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
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
        const { username, email, passwordOne } = this.state;


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
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;
        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';
        return(
            <form onSubmit={this.onSubmit}>
                <input
                    name="lastname"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Nom"
                />
                <br/>
                <input
                    name="name"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Prénom"
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
                <h2 className="titre">Rôle :</h2>
                <Col sm={4}>

                    <Form.Check
                        type="radio"
                        label="Utilisateur"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                    />
                    <Form.Check
                        type="radio"
                        label="Expert FALC"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                    />
                    <Form.Check
                        type="radio"
                        label="Groupe de relecture"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios3"
                    />
                    <Form.Check
                        type="radio"
                        label="Expert juridique"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios3"
                    />
                </Col>
                <br/>
                <input
                    name="tarif"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="text"
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