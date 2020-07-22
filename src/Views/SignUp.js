import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {compose} from 'recompose';
import {withFirebase} from '../Components/Firebase'
import '../Css/SignUp.css'
import {button, Form, Row, Container, Col} from 'react-bootstrap';
import firebase from "firebase";
import loginimg from '../Img/login-book.png';
import logo2 from '../logo_white.svg';
var roleg= "rôle";
var e = new Error("Cette adresse mail possède déjà un compte. Merci de vous connecter.");
const SignUpPage = () => (
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
                    <h2 className="sign-h2">Inscription</h2>
                    <SignUpForm/>
                </Col>
            </Row>

        </Container>
    </div>
);

const INITIAL_STATE = {
    name: '',
    lastname: '',
    email: '',
    role: '',
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
    componentDidMount(){
        document.body.style.backgroundColor = "#3949AB"// Set the style
    }
    componentWillUnmount() {
        document.body.style.backgroundColor = "#FFFFFF"
    }
    onSubmit = event => {
        const { name, lastname, email, tarif, passwordOne } = this.state;

        firebase.database().ref('users').push(
            {
                name: name,
                lastname: lastname,
                email: email,
                role: roleg,
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
                localStorage.setItem("userConnected", email)
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
    onClick = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state.role);
    };

    render() {
        const {
            name,
            lastname,
            email,
            role,
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
        const tarifInvalid =
            roleg === 'Utilisateur' ||
            roleg === '';
        return(
            <form onSubmit={this.onSubmit}>
                <input className="sign-input"
                    name="name"
                    value={name}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Prénom"
                />
                <br/>
                <input className="sign-input"
                    name="lastname"
                    value={lastname}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Nom"
                />
                <br/>
                <input className="sign-input"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email"
                />
                <br/>
                <div className="dropdown">
                    <button className="dropbtn" value={role} onChange={this.onChange}>{roleg}</button>
                    <div className="dropdown-content">
                        <a href="#" value={role} onClick={() =>(roleg="Utilisateur")}>Utilisateur</a>
                        <a href="#" value={role} onClick={() =>(roleg="Expert FALC")}>Expert FALC</a>
                        <a href="#" value={role} onClick={() =>(roleg="Groupe de relecture")}>Groupe de relecture</a>
                        <a href="#" value={role} onClick={() =>(roleg="Expert juridique")}>Expert juridique</a>
                        <a href="#" value={role} onClick={() =>(roleg="Expert médical")}>Expert médical</a>
                    </div>
                </div>
                <br/>
                <input className="sign-input"
                    name="tarif"
                    value={tarif}
                    onChange={this.onChange}
                    type="number"
                    placeholder="Tarif"
                />
                <br/>
                <input className="sign-input"
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Mot de passe"
                />
                <br/>
                <input className="sign-input"
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirmation"
                />
                <br/>
                <button className="sign-button" disabled={isInvalid} type="submit">S'inscrire</button>
                <Link to={"/"}>
                    <button className="sign-button" type="button">
                        Se connecter
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
