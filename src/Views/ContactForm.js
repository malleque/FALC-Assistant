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
            return(
                <div>

                        {arrContact.map(item => (
                            <td key={item.title}>
                                <div className="splitC ">
                                <h1>Contact : {item.lastname} {item.name}</h1>
                                </div>
                                <div className="splitTarif">
                                    <h3>Tarif : {item.tarif}.- CHF</h3>
                                </div>
                                <div className="splitMC">
                                    <h3> Role : {item.role}</h3>
                                </div>
                                <div className="splitMDC">
                                    <h3>Document : {localStorage.getItem("documentTitle")}</h3>
                                </div>
                                <div className="splitDC">
                                <Form className="contactform-input">
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Votre message pour le relecteur:</Form.Label>
                                <Form.Control onChange={this.handleText} as="textarea" rows="10"/>
                            </Form.Group>
                        </Form>
            </div>
            <div className="splitButton">
                    <Link to={"/Community"}>
                        <button onClick={this.handleSubmit} className="button"
                        >Contacter
                        </button>
                    </Link>
            </div>
                        </td>
                        ))}
                </div>
                    );
        };
    }
    export default ContactForm;

