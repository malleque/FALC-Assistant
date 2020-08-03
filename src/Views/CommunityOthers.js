import React, {Component} from 'react';
import {Col, Table, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {OverlayTrigger, Popover, Button} from "react-bootstrap";
import firebase from "firebase";
const listPeople = [
    {
        id:'1',
        mail:'praz.florent@gmail.com',
        lastname: 'Praz',
        name: 'Florent',
        role: 'Expert Falc',
        tarif: '10 chf',
        document: 'coronavirus',
        version : 'version de travail 1',
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
        id:'2',
        mail: 'dayer.arnaud@gmail.com',
        lastname: 'Dayer',
        name: 'Arnaud',
        role: 'Groupe de relecture',
        tarif: '20 chf',
        document: 'coronavirus',
        version: 'version de travail 1',
        modification: '13.07.2020',
        data:
            'Restaurants et bars\n' +
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
        id:'3',
        mail:'clerc.isaac@gmail.com',
        lastname: 'Clerc',
        name: 'Isaac',
        role: 'Expert juridique',
        tarif: '10 chf',
        document: 'réunion',
        version : 'texte initial',
        modification: '15.07.2020',
        data: 'test'
    },
    {
        id:'4',
        mail:'dettwiler.yann@gmail.com',
        lastname: 'Dettwiler',
        name: 'Yann',
        role: 'Expert médical',
        tarif: '40 chf',
        document: 'réunion',
        version : 'texte initial',
        modification: '15.07.2020',
        data: 'test'
    },
]
var messages;
var senders;
class CommunityOthers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [],
            arrSender:[],
        }
        //take the contact between users and other people
        firebase.database().ref().child('contact').on('value', data => {
            console.log(data.val());
            messages = data.toJSON();
            const arrMessage = [];
            if (messages === null) {
                return (null)
            }
            Object.keys(messages).forEach(function (key) {
                console.log(messages[key]);
                if (messages[key].receiver === localStorage.getItem("userConnected") && messages[key].status === "accepté") arrMessage.push({
                    name: key,
                    value: messages[key]
                });
            });
            var sorted_files = arrMessage.sort((a,b) => {
                return new Date(a.value.date).getTime() -
                    new Date(b.value.date).getTime()
            }).reverse();
            this.setState({arr: arrMessage});
            console.log(arrMessage);
        });
        /*//take the data of the sender
        firebase.database().ref().child('users').on('value', data =>{
            console.log(data.val());
            senders=data.toJSON();
            const sender = [];
            Object.keys(senders).forEach(function(item){
                console.log(localStorage.getItem("userConnected"));
                console.log(senders[item]);
                if(senders[item].email===arrMessage.value.sender){
                    sender.push(senders[item]);
                }
            });
        this.setState({arrSender: sender});
        console.log(sender);
        });*/

    }

    render() {
        if(!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
        var arrMessage = this.state.arr;
        console.log(arrMessage);
        {
            return (
                <div>
                    <Container fluid>
                        <Row>
                            <Col>
                                <h1>Documents acceptés</h1>
                            </Col>
                            <Col>
                                    <Link to={"/CommunityNew"}>
                                        <button type="button"
                                                className="buttonMenu" type="submit"
                                        >Nouvelles demandes
                                        </button>
                                    </Link>
                            </Col>
                        </Row>
                    </Container>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>Personne</th>
                            <th>Document</th>
                            <th>Modifié le ...</th>
                            <th>message</th>
                        </tr>
                        </thead>
                        <tbody>
                        {arrMessage.map(item => (
                            <tr key={item.value.date}>
                                <td onClick={() =>(localStorage.setItem("documentTitle", item.value.title), window.location = '/CommunityFile')}>{item.value.sender}</td>
                                <td>
                                    <Link to="/CommunityFile"
                                          onClick={() =>(localStorage.setItem("sender", item.value.username), localStorage.setItem("documentName", item.value.title), localStorage.setItem("idMessage", item.name))}>
                                        {item.value.title}
                                    </Link>
                                </td>
                                <td onClick={() =>(localStorage.setItem("documentTitle", item.value.title), window.location = '/CommunityFile')}>{item.value.date}</td>
                                <td>
                                    <OverlayTrigger
                                        trigger="click"
                                        key={'top'}
                                        placement={'top'}
                                        overlay={
                                            <Popover id={`popover-positioned-top`}>
                                                <Popover.Title as="h3">{`Message:`}</Popover.Title>
                                                <Popover.Content>
                                                    {item.value.message}
                                                </Popover.Content>
                                            </Popover>
                                        }
                                    >
                                        <button className="buttonTable">Message</button>
                                    </OverlayTrigger>
                                </td>
                                <td><Link to="/Chat" onClick={()=>(localStorage.setItem("receiver", item.value.sender))} style={{color:"green"}} >
                                    Chat
                                </Link>
                                </td>
                            </tr>
                        ))}

                        </tbody>
                    </Table>
                </div>
            );
        }
    };
}
export default CommunityOthers;