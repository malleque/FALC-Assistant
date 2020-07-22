import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Components/Firebase';
import '../Css/SignIn.css'
import {Button, Container, Row, Col} from "react-bootstrap";
import loginimg from '../Img/login-book.png'
import logo2 from "../logo_white.svg";

var e = new Error("Le mot de passe est incorrect ou l'adresse mail n'existe pas.");

const SignInPage = () => (
    <div className="sign-div">
        <Container>
            <Row>
                <img className = "logo" src={logo2}/><text className="logo-text">FALC-Assistant</text>
            </Row>
            <Row>
                <Col>
                    <img className="sign-img" src={loginimg}/>
                </Col>
                <Col>
                    <h2 className="sign-h2">Se connecter</h2>
                    <div className="signin-formulaire"><SignInForm /></div>
                </Col>
            </Row>
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
    componentDidMount(){
        document.body.style.backgroundColor = "#3949AB"// Set the style
        document.body.className="body-component-a" // Or set the class
    }
    componentWillUnmount() {
        document.body.style.backgroundColor = "#FFFFFF"
    }

    onSubmit = event => {
        const { email, password } = this.state;
        localStorage.setItem('userConnected', email);
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
            <div className="sign-div">
            <form className="sign-form" onSubmit={this.onSubmit}>
                <input className="sign-input"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Adresse email"
                />
                <br/>
                <input className="sign-input"
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Mot de passe"
                />
                <br/>
                <button className="sign-button" disabled={isInvalid} type="submit">
                Se connecter
                </button>
                <Link to={"/SignUp"}>
                            <button className="sign-button">
                            S'inscrire
                            </button>
                </Link>

                <br/>
                <Link to={"/PasswordForget"} style={{color: "white"}}>Mot de passe oublié?</Link>
                {error && <p>{e.message}</p>}
                </form>
            </div>
        );
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };