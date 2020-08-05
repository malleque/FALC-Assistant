import React, {Component} from "react";
import firebase from 'firebase';
import {button, Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import moment from 'moment';
import '../Css/Home.css'
var versionS= "version";
class NewFile extends Component {
    state = {
        title: "",
        version: "",
        data : "",
    }
    handleTitle = e => {
        this.setState({
            title: e.target.value
        })
    }
    handleText = e => {
        this.setState({
            data: e.target.value
        })
    }
    handleSubmit = e => {
        firebase.database().ref('files/'+localStorage.getItem("username")).push(
            {
                title: this.state.title,
                version: "texte initial",
                date : moment().format("DD-MM-YYYY hh:mm:ss"),
                data : this.state.data
            }
        );
        this.setState({
            text: ""
        })
    }

    render() {
        const {version} = this.state;
        return (
            <Container>
                <Row>
                    <Col className="contactform-title">
                        <h1>Nouveau document</h1>
                    </Col>
                </Row>
                    <Form className="contactform-input">
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Titre du document</Form.Label>
                            <Form.Control onChange={this.handleTitle} as="textarea" rows="1"/>
                        </Form.Group>
                    </Form>
                    <Form className="contactform-input">
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Entrer le texte :</Form.Label>
                            <Form.Control onChange={this.handleText} as="textarea" rows="10"/>
                        </Form.Group>
                    </Form>
                <br/>
                <Link to={"/Files"}>
                    <button className="buttonCreate" onClick={this.handleSubmit}
                    >Créer
                    </button>
                </Link>

            </Container>
        );
    };
}
export default NewFile;
