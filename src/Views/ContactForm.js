import React, {Component} from "react";
import '../Css/Home.css';
import {Col, Container, Form, Row, Breadcrumb, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import firebase from "firebase";
import moment from "moment";
var contact;
var idPush;
    class ContactForm extends Component {
        constructor(props) {
            super(props);
            this.state = {
                arrContact: [],
                name: "",
                lastname:""
            }
            firebase.database().ref().child('users/').on('value', data => {
                console.log(data.val());
                contact = data.toJSON();
                const arrContact = [];
                Object.keys(contact).forEach(function (item) {
                    console.log(contact[item]);
                    if (contact[item].email === localStorage.getItem("personContact")) arrContact.push(contact[item]);
                    console.log(arrContact);
                });
                this.setState ({
                    arrContact: arrContact
                });
            });
        }
        handleText = e => {
            this.setState({
                text: e.target.value
            })
        }
        handleSubmit=e =>{
            idPush = firebase.database().ref('contact').push(
                {
                    message : this.state.text,
                    title: localStorage.getItem("documentTitle"),
                    sender: localStorage.getItem("userConnected"),
                    receiver: localStorage.getItem("personContact"),
                    status: "en attente",
                    date : moment().format("DD-MM-YYYY hh:mm:ss"),
                    username: localStorage.getItem("username")
                });
            this.setState({
                text: ""
            })
        }

        render() {
            if(!window.location.hash) {
                window.location = window.location + '#loaded';
                window.location.reload();
            }
            var arrContact= this.state.arrContact;
            return (
                <Container>
                    {arrContact.map(item => (
                        <td key={item.title}>
                    <Row>
                        <Col className="contactform-title">
                            <h1>Formulaire de contact</h1>
                        </Col>
                    </Row>
                    <div className="contactform-div">
                        <Row>
                            <Col className="contactform-title">
                                <h2>{item.lastname} {item.name}</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="contactform-input">
                                <h3>{item.role}</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="contactform-input">
                                <h3>{localStorage.getItem("documentTitle")}</h3>
                            </Col>
                        </Row>

                        <Form className="contactform-input">
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Laisser un commentaire:</Form.Label>
                                <Form.Control onChange={this.handleText} as="textarea" rows="10"/>
                            </Form.Group>
                        </Form>
                    </div>
                    <Link to={"/Community"}>
                        <Button onClick={this.handleSubmit} variant="primary" size="lg"
                        >Contacter
                        </Button>
                    </Link>
                        </td>
                            ))}
                </Container>
                    );
        };
    }
    export default ContactForm;

