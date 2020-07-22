import React, {Component} from "react";
import firebase from 'firebase';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import moment from 'moment';

class NewFile extends Component {
    getCurrentDate(separator=''){

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }
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
    handleVersion = e => {
        this.setState({
            version: e.target.value
        })
    }
    handleSubmit = e => {
        let documentRef = firebase.database().ref('files').orderByKey().limitToLast(1000);
        firebase.database().ref('files').push(
            {
                message: this.state.title,
                owner: localStorage.getItem("userConnected"),
                version: this.state.version,
                date : moment().format("DD-MM-YYYY hh:mm:ss"),
                data : this.state.data
            }
        );
        this.setState({
            text: ""
        })
    }

    render() {
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
                        <Form.Label>Version du document</Form.Label>
                        <Form.Control onChange={this.handleVersion} as="textarea" rows="1"/>
                    </Form.Group>
                </Form>
                <Link to={"/Files"}>
                    <Button onClick={this.handleSubmit} variant="primary" size="lg"
                    >Créer
                    </Button>
                </Link>

            </Container>
        );
    };
}
export default NewFile;
