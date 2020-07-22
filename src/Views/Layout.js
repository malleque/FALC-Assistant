import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import React, {Component} from "react";
import '../Css/Home.css';
import button from "react-bootstrap/Button";
import {Col, Container, Dropdown, DropdownButton, Row, Breadcrumb} from "react-bootstrap";
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
let tmpFileI;
{listFiles.map((item) => {
        if (item.id == "1") {
            tmpFileI = item;
        }
    }
)};
let tmpFile;
{listFiles.map((item) => {
        if (item.id == localStorage.getItem("documentTitle")) {
            tmpFile = item;
        }
    }
)};
var dataTest="";
class Layout extends Component {
    state = {
        data: ""
    }
    handleData = e => {
        this.setState({
            data: dataTest
        })
    }
    handleSubmit=e =>{
        let texteRef = firebase.database().ref('test').orderByKey().limitToLast(1000);
        firebase.database().ref('test').push(
            {
                data: this.state.data
            }
        );
        this.setState({
            text: ""
        })
    }
    render() {
        return (
            <div>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col sm>
                            <div className="Home-title">
                                <h1>{tmpFile.document}</h1>
                            </div>
                        </Col>
                        <Col sm>
                            <div className="Home-button">
                                <button  onClick={this.handleSubmit} type="button"
                                        className="btn btn-primary btn-lg" type="submit"
                                >Sauvegarder
                                </button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/File">Transcription</Breadcrumb.Item>
                            <Breadcrumb.Item active>Mise en page</Breadcrumb.Item>
                            <Breadcrumb.Item href="/FindPeople">Trouver un contact</Breadcrumb.Item>

                        </Breadcrumb>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col sm>
                            <div className="Home-title">
                                <h3>{tmpFile.version}</h3>
                            </div>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col sm key={localStorage.getItem("documentTitle")}>
                            <CKEditor
                                editor={DecoupledEditor}
                                onInit={editor => {
                                    console.log('Editor is ready to use!', editor);

                                    // Insert the toolbar before the editable area.
                                    editor.ui.getEditableElement().parentElement.insertBefore(
                                        editor.ui.view.toolbar.element,
                                        editor.ui.getEditableElement()
                                    );
                                }}
                                onChange={(event, editor) => {
                                    dataTest = editor.getData();
                                    this.handleData()
                                    console.log({event, editor, dataTest});
                                }}
                                editor={DecoupledEditor}
                                data={tmpFile.data}
                                config={DecoupledEditor}
                            />
                        </Col>

                    </Row>

                </Container>

            </div>
        );
    };
}
export default Layout;