import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Container, Row, Col, DropdownButton, Dropdown, button} from 'react-bootstrap';
import '../Css/Home.css';
import firebase from "../Components/Firebase";
var policeU= "Arial";
var tailleU= "12";
const INITIAL_STATE = {
    police: '',
    taille: '',
};

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};

    }

    onSubmit = event => {
        const {police, taille} = this.state;

        firebase.database().ref('settingsU').push(
            {
                police: policeU,
                taille: tailleU
            }
        ).then(() => {
            console.log('INSERTED!')
        }).catch((error) => {
            console.log('INSERTED!')
        });    }
        render()
        {
            const {
                police,
                taille,
            } = this.state;

            return (
                <Container>
                    <Row className="justify-content-md-center">

                        <Col sm>
                            <div className="Home-title">
                                <h1>Accueil</h1>
                            </div>
                        </Col>
                        <Col sm>
                            <div className="dropdown">
                                <button className="dropbtn" value={police} onChange={this.onChange}>{policeU}</button>
                                <div className="dropdown-content">
                                    <a href="#" value={police} onClick={() => (policeU = "Arial")}>Arial</a>
                                    <a href="#" value={police} onClick={() => (policeU = "Trebuchet MS")}>Trebuchet MS</a>
                                    <a href="#" value={police} onClick={() => (policeU = "Time New Roman")}>Time New Roman</a>

                                </div>
                            </div>
                        </Col>
                        <Col sm>
                            <div className="dropdown">
                                <button className="dropbtn" value={taille} onChange={this.onChange}>{tailleU}</button>
                                <div className="dropdown-content">
                                    <a href="#" value={taille} onClick={() => (policeU = "12")}>12</a>
                                    <a href="#" value={taille} onClick={() => (policeU = "15")}>15</a>
                                    <a href="#" value={taille} onClick={() => (policeU = "22")}>22</a>

                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row class="mb-5">
                        <p>
                            Le falc assistant est une aide pour l'écriture en falc. <br/>
                            Vous trouverez sur ce site : <br/>
                            1) une page avec vos différents documents<br/>
                            2) une page de modification avec les erreurs des textes.<br/>
                            3)une page communautaire pour la relecture
                        </p>
                    </Row>

                    <Row class="mb-5">
                        <p className="text">
                            Comment nous contacter ?<br/>
                            027/000.00.00<br/>
                            Rue de la plaine 2,<br/>
                            3960 Sierre<br/>
                            Exemple@falc-assistant.ch<br/>
                        </p>

                    </Row>
                </Container>

            );
        }
    }
export default Home