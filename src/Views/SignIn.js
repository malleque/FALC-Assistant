import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Components/Firebase';
import '../Css/SignIn.css'
import {Button, Container, Row, Col} from "react-bootstrap";

var e = new Error("Le mot de passe est incorrect ou l'adresse mail n'existe pas.");

const SignInPage = () => (
    <div>
        <Container>
            <Row>
                <h1>Bienvenue sur le FALC Assistant!</h1>
            </Row>
            <Row>
                <h2>Se connecter</h2>
            </Row>
            <Row><div className="signin-formulaire"><SignInForm /></div> </Row>
        </Container>



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
        localStorage.setItem('email', email);
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
            <form onSubmit={this.onSubmit}
            className="signin-form">
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Adresse email"
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
                            <Button variant="primary" size="lg" block
                            >S'inscrire
                            </Button>
                </Link>{' '}
                            <Button disabled={isInvalid} type="submit" variant="primary" size="lg" block>
                                Se connecter
                            </Button>
                <Link to={"/PasswordForget"}>Mot de passe oublié?</Link>
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