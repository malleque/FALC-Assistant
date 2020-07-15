import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Container, Row, Col, DropdownButton, Dropdown} from 'react-bootstrap';
import '../Css/Home.css';

class Home extends Component{
    constructor(props) {
        super(props);

    }
    police = "Trebuchet MS";
    render(){
        let textStyle = {
            display: "inline-block",
           textAlign: "left",
            marginTop: "5%",
            width: "100%",
            fontFamily: "Helvetica",
            fontSize: "30"
        };
    return(
        <Container>
            <Row className="justify-content-md-center">

                <Col sm>
                    <div className="Home-title">
                        <h1 className="text">Accueil</h1>
                    </div>
                </Col>
                <Col sm>
                        <div className="Home-button">
                            <DropdownButton id="dropdown-basic-button" title="Police d'écriture">
                                <Dropdown.Item href="#/action-1" onClick={this.police = "Arial"}>Arial</Dropdown.Item>
                                <Dropdown.Item href="#/action-2" onClick={this.police= "Helvetica"}>Times New Roman</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">MS Trebuchet</Dropdown.Item>
                            </DropdownButton>
                        </div>
                </Col>
                <Col sm>
                    <div className="Home-button">
                            <DropdownButton id="dropdown-basic-button" title="Taille d'écriture">
                                <Dropdown.Item href="#/action-1">11</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">14</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">16</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">20</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">22</Dropdown.Item>
                            </DropdownButton>
                        </div>
                </Col>
            </Row>
            <Row class="mb-5">
                <Col>
                    <p style={{fontFamily: "Arial"}} >
                    Le falc assistant est une aide pour l'écriture en falc. <br/>
                    Vous trouverez sur ce site : <br/>
                    1) une page avec vos différents documents<br/>
                    2) une page de modification avec les erreurs des textes.<br/>
                    3)une page communautaire pour la relecture
                </p>
                </Col>
                <Col/>
            </Row>

            <Row class="mb-5">
                <Col>
                    <p className="text">
                    Comment nous contacter ?<br/>
                    027/000.00.00<br/>
                    Rue de la plaine 2,<br/>
                    3960 Sierre<br/>
                    Exemple@falc-assistant.ch<br/>
                    </p>
                </Col>
                <Col/>
            </Row>
        </Container>

    );}
}
export default Home