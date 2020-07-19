import React from 'react';
import {Col, Table, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import button from "react-bootstrap/Button";
const listFiles = [
    {
        id:'1',
        document: 'coronavirus',
        version : 'texte initial',
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
        id:'2',
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
        id:'3',
        document: 'réunion',
        version : 'texte initial',
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
                            >Retour
                            </button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Table responsive>
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Document</th>
                    <th>Commentaire</th>
                </tr>
                </thead>
                <tbody>
                {listPeople.map(item=>(
                    <tr key={item.id}>
                        <td>{item.lastname}</td>
                        <td>{item.name}</td>
                        <td>Coronavirus</td>
                        <td>
                            <Link to="/Community"
                                  onClick={() =>(localStorage.setItem("personContact", item.id))}>
                                Commentaire
                            </Link>
                        </td>
                        <td>
                            <Link to="/Community"
                                  onClick={() =>(localStorage.setItem("personContact", item.id))}>
                                Accepter
                            </Link>
                        </td>
                        <td>
                            <Link to="/Community" style={{color: "red"}}
                                  onClick={() =>(localStorage.setItem("personContact", item.id))}>
                                Refuser
                            </Link>
                        </td>
                    </tr>
                ))}
                {listFiles.map(file=>(
                    <tr key={file.id}>
                        <td>{file.document}</td>
                        <td>{file.document}</td>
                        <td>{file.version}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}
export default Community