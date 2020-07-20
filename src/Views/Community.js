import React from 'react';
import {Col, Table, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import button from "react-bootstrap/Button";
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
function Community() {
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h1>Contacts</h1>
                    </Col>
                    <Col>
                        <div className="Home-button">
                            <Link to={"/CommunityO"}>
                                <button type="button"
                                        className="btn btn-primary btn-lg" type="submit"
                                >Community autres utilisateurs
                                </button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>


            <Table responsive>
                <thead>
                <tr>
                    <th>Lastname</th>
                    <th>Name</th>
                    <th>Rôle</th>
                    <th>Document</th>
                    <th>Date</th>
                    <th>Version</th>
                </tr>
                </thead>
                <tbody>
                {listPeople.map(item=>(
                    <tr key={item.id}>
                        <td>{item.lastname}</td>
                        <td>{item.name}</td>
                        <td>{item.role}</td>
                        <td>
                            <Link to="/File"
                                  onClick={() =>(localStorage.setItem("documentTitle", item.id))}>
                                {item.document}
                            </Link>
                        </td>
                        <td>{item.modification}</td>
                        <td>{item.version}</td>

                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}
export default Community