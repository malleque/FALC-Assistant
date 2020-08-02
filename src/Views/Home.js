import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Container, Row, Col, DropdownButton, Dropdown, button} from 'react-bootstrap';
import '../Css/Home.css';
import firebase from "firebase";
var policeU= "Arial";
var tailleU= "12";
const INITIAL_STATE = {
    police: '',
    taille: '',
    texte:[],
};
var userD;
var text;
class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
        //Récupération du username par la db via l'email
        firebase.database().ref().child('users').on('value', data => {
            console.log(data.val());
            userD = data.toJSON();
            const users = [];
            const role = [];
            Object.keys(userD).forEach(function (item) {
                console.log(localStorage.getItem("userConnected"));
                console.log(userD[item]);
                if (userD[item].email === localStorage.getItem("userConnected")) {
                    users.push(userD[item].username);
                    role.push(userD[item].role);
                    localStorage.setItem("username", users);
                    localStorage.setItem("role", role);
                    if (!window.location.hash) {
                        window.location = window.location + '#loaded';
                        window.location.reload();
                    }
                }
            });

        });
        //Récupération du texte de la page d'accueil
        firebase.database().ref('accueil').on('value', data => {
            console.log(data.val());
            text = data.toJSON();
            var arrText = [];
            console.log(text)
            Object.keys(text).forEach(key => arrText.push({name: key, value: text[key]}))
            this.setState({texte: arrText});
            console.log(arrText);
        });


    }
        render() {

            const {
                police,
                taille,
            } = this.state;
            var text = this.state.texte;
            console.log(text);
            return (
                <Container>
                    <Row className="justify-content-md-center">

                        <Col sm>
                            <div className="Home-title">
                                <h1>Accueil</h1>
                            </div>
                        </Col>
                        {/*<Col sm>
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
                        </Col>*/}
                    </Row>
                    {text.map(item=>(
                        <td key = {item.name}>

                    <Row class="mb-5">

                        <p className="text">
                             Le falc assistant est une aide pour l'écriture en falc. <br/>
                                Vous trouverez sur ce site : <br/>
                                1) une section Documents qui permet de :<br/>
                                &emsp;&emsp;A) Transcrire votre document avec une assistance<br/>
                                &emsp;&emsp;B) Faire la mise en page de votre document<br/>
                                &emsp;&emsp;C) Trouver un contact<br/>
                                2) une section Communauté qui permet de : <br/>
                                &emsp;&emsp;A) Consulter les documents que l'on a partagé avec quelqu'un <br/>
                                &emsp;&emsp;B) Envoyer des messages à votre relecteur <br/>
                                3) Des paramètres pour choisir les règles que vous souhaitez utiliser
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
                        </td>
                        ))}
                </Container>

            );
        }
    }
export default Home