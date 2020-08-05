import React, {Component} from "react";
import firebase from 'firebase';
import {button, Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import moment from 'moment';
import '../Css/Home.css'

class NewWord extends Component {
    state = {
        rule: "",
        word : "",
    }
    handleRule = e => {
        this.setState({
            rule: e.target.value
        })
    }
    handleWord = e => {
        this.setState({
            word: e.target.value
        })
    }
    handleSubmit = e => {
        firebase.database().ref('dictionnary/'+localStorage.getItem("username")).push(
            {
                rule: this.state.rule,
                word : this.state.word
            }
        );
        this.setState({
            text: ""
        })
    }

    render() {
        const {version} = this.state;
        return (
            <Container fluid>
                <Row>
                    <Col className="contactform-title">
                        <h1>Nouveau document</h1>
                    </Col>
                </Row>
                <Form className="contactform-input">
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Règle :</Form.Label>
                        <Form.Control onChange={this.handleRule} as="textarea" rows="1"/>
                    </Form.Group>
                </Form>
                <Form className="contactform-input">
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Mot: </Form.Label>
                        <Form.Control onChange={this.handleWord} as="textarea" rows="1"/>
                    </Form.Group>
                </Form>
                <br/>
                <Link to={"/Settings"}>
                    <button className="buttonCreate" onClick={this.handleSubmit}
                    >Créer
                    </button>
                </Link>

            </Container>
        );
    };
}
export default NewWord;