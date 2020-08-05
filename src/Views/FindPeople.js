import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import React, {Component} from "react";
import '../Css/Home.css';
import button from "react-bootstrap/Button";
import {Col, Container, Dropdown, DropdownButton, Row, Breadcrumb, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {map} from "react-bootstrap/ElementChildren";
import firebase from 'firebase';
const listFiles = [
    {
        id: '1',
        document: 'coronavirus',
        version: 'texte initial',
        modification: '13.07.2020',
        data: 'Ouverts ou autorisés depuis le 6 juin\n' +
            'Assemblées de sociétés jusqu’à 300 personnes (délai pour la convocation d’assemblées écrites ou électroniques : 1er juillet)\n' +
            'Enseignement présentiel au secondaire II, dans les écoles professionnelles, les hautes écoles ainsi que dans les autres établissements de formation\n' +
            'Entraînement sportif avec contact physique, par exemple lutte, boxe, football américain ou rugby\n' +
            'Établissements tels que les casinos, centres de loisirs, parcs animaliers, jardins botaniques et zoologiques, centres de bien-être, piscines\n' +
            'Établissements de tourisme estival tels que les aires de campings, chemins de fer de montage, pistes de luge, parcs de VTT et parcs d’aventures\n' +
            'Établissements érotiques, services d’escort, prostitution\n' +
            'Centres de vacances pour enfants et adolescents avec au maximum 300 personnes\n' +
            'Compétitions sportifs jusqu’à 300 personnes (à condition de désigner une personne responsable de faire respecter le plan de protection)\n' +
            'Dans la restauration, activités comme le billard, les fléchettes, la musique en direct, à condition de :'
    },
    {
        id: '2',
        document: 'coronavirus',
        version: 'version de travail 1',
        modification: '13.07.2020',
        data: 'Restaurants et bars\n' +
            'Il est à nouveau possible de se réunir à plus de 4 personnes au restaurant ou dans un bar.\n' +
            'Mais des règles strictes s’appliquent :\n' +
            'Une personne du groupe doit indiquer son nom et son adresse.\n' +
            'Il faut s’asseoir à une table pour boire ou manger.\n' +
            'Sauf dans les discothèques, les night-clubs et les salles de danse.\n' +
            'On peut à nouveau jouer au billard ou aux fléchettes.\n' +
            'Écouter de la musique live est à nouveau possible.\n' +
            'Les horaires d’ouverture sont limités.\n' +
            'Rassemblements et manifestations\n' +
            'Les réunions de plus de 5 personnes sont à nouveau possibles.\n' +
            'Sont autorisés :\n' +
            'Les camps de vacances pour enfants et jeunes jusqu’à 300 participants au maximum\n' +
            'Les services religieux et fêtes religieuses\n' +
            'La récolte de signatures dans l’espace public\n' +
            'Les manifestations politiques jusqu’à 300 personnes au maximum\n' +
            'Mais il doit y avoir un plan de protection.\n' +
            'Une personne doit être responsable du plan de protection.\n' +
            'Les manifestations jusqu’à 300 personnes au maximum'
    },
    {
        id: '3',
        document: 'réunion',
        version: 'texte testage',
        modification: '15.07.2020',
        data: 'test'
    },

];
const listPeople = [
    {
        id:'1',
        mail:'praz.florent@gmail.com',
    lastname: 'Praz',
    name: 'Florent',
    role: 'Expert Falc',
    tarif: '10 chf'
},
{
    id:'2',
    mail:'dayer.arnaud@gmail.com',
    lastname: 'Dayer',
    name: 'Arnaud',
    role: 'Groupe de relecture',
    tarif: '20 chf'
},
{
    id:'3',
    mail:'clerc.isaac@gmail.com',
    lastname: 'Clerc',
    name: 'Isaac',
    role: 'Expert juridique',
    tarif: '10 chf'
},
    {
        id:'4',
        mail:'dettwiler.yann@gmail.com',
        lastname: 'Dettwiler',
        name: 'Yann',
        role: 'Expert médical',
        tarif: '40 chf'
    },
    ]
let choice = [...listPeople];
let experts = listPeople.filter(function (people){
    return people.role === "Expert Falc"
})
let relecteur = listPeople.filter(function (people){
    return people.role === "Groupe de relecture"
})
let juridique = listPeople.filter(function (people){
    return people.role === "Expert juridique"
})
let medical = listPeople.filter(function (people){
    return people.role === "Expert médical"
})
var contacts;
var filter="filter";
class FindPeople extends Component {
    constructor(props) {
        super(props);
        this.container = React.createRef();
        this.state = {
            arrContact: [],
            open: false,
            filter : {filter},
        }
        firebase.database().ref().child('users').on('value', data =>{
            console.log(data.val());
            contacts = data.toJSON();
            const arrContact = [];
            Object.keys(contacts).forEach(function(item){
                console.log(localStorage.getItem("userConnected"));
                console.log(contacts[item]);
                if(contacts[item].email!=localStorage.getItem("userConnected")) arrContact.push(contacts[item]);
            });
            this.setState({arrContact: arrContact})
        });
    }
    handleButtonClick = () => {
        this.setState(state => {
            return {
                open: !state.open,
            };
        });
    };
    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }
    handleClickOutside = event => {
        if (this.container.current && !this.container.current.contains(event.target)) {
            this.setState({
                open: false,
            });
        }
    };

    render(){
        var arr=this.state.arrContact;
        console.log(arr);
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col sm>
                    <div>
                        <h1>Trouver un contact</h1>
                    </div>
                </Col>
                <Col sm>
                    <div ref={this.container}>
                        <h3 type="button" className="buttonDropdown" onClick={this.handleButtonClick}>
                            {filter} ☰
                        </h3>
                        {this.state.open && (
                        <div className="dropdown">
                            <ul>
                                        <li className="liDropdown" onClick={() =>(filter="Expert FALC", this.setState({filter: filter}))}>Expert FALC</li>
                                        <li className="liDropdown" onClick={() =>(filter="Groupe de relecture")}>Groupe de relecture</li>
                                        <li className="liDropdown" onClick={() =>(filter="Expert juridique")}>Expert juridique</li>
                                        <li className="liDropdown" onClick={() =>(filter="Expert médical")}>Expert médical</li>
                                </ul>
                        </div>
                        )}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div id="breadcrumbNav2">
                        <div id="arrowBar2">
                            <a> <span className="AB2rotate color0"><span
                                className="AB2rotateReset"><span
                                className="AB2text0"><h1>Etapes:</h1></span></span></span></a>
                            <a href="/File"> <span className="AB2rotate color1 AB1rotate"><span
                                className="AB2rotateReset"><span
                                className="AB2text1">Transcription</span></span></span></a>
                            <a href="/Layout"> <span className="AB2rotate color2 AB1rotate"><span
                                className="AB2rotateReset"><span
                                className="AB2text2">Mise en page</span></span></span></a>
                            <a > <span className="AB2rotate active3 AB1rotate"><span
                                className="AB2rotateReset"><span
                                className="AB2textActive">Relecture</span></span></span></a>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>titre document</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>Lastname</th>
                        <th>Name</th>
                        <th>Rôle</th>
                        <th>tarif</th>
                    </tr>
                    </thead>
                    <tbody>
                   {arr.map(item=>(
                        <tr key={item.email}>
                            <td>{item.lastname}</td>
                            <td>{item.name}</td>
                            <td>{item.role}</td>
                            <td>{item.tarif} chf/h</td>
                            <td>
                                <Link to="/ContactForm"
                                      onClick={() =>(localStorage.setItem("personContact", item.email))}>
                                    contacter
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                </Col>
            </Row>
        </Container>
    )
    }
}
export default FindPeople;