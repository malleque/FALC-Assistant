import React from 'react';
import {Link} from "react-router-dom";
import button from "react-bootstrap/Button";
import {Table} from "react-bootstrap";
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
function Files() {
    return (
        <div>
        <h1>Documents</h1>
            <div>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>Document</th>
                        <th>Date</th>
                        <th>Version</th>
                        <th>Lien</th>
                    </tr>
                    </thead>
                    <tbody>

                    {listFiles.map(item=>(
                        <tr key={item.id}>
                            <td>{item.document}</td>
                            <td>{item.version}</td>
                            <td>Modifié le {item.modification}</td>
                            <td><Link to={"/File"} onClick={localStorage.setItem("TitreDocument",item.id)}>
                            {item.document}
                        </Link></td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>

);
}
export default Files