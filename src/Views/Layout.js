import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import React, {Component} from "react";
import '../Css/Home.css';
import button from "react-bootstrap/Button";
import {Col, Container, Dropdown, DropdownButton, Row, Breadcrumb} from "react-bootstrap";
import firebase from 'firebase';
import moment from "moment";

/*const listFiles = [
    {
        id: '1',
        document: 'coronavirus',ma
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
)};*/
var count=1;
var dataTest="";
var files;
function findVersionNumber(arr) {
    if (arr.length != 0) {
        console.log(arr);
        for (var i = 0; i <= arr.length - 1; i++) {
            console.log(arr[i].title)
            if (arr[i].version.includes("page")) {
                if (count <= arr[i].numberV)
                    count = arr[i].numberV + 1;
            }
        }

    }
}
class Layout extends Component {
    constructor(){
        super();

    this.state = {
        arrFile: [],
        data: ""
    }
    //take the file from the database
    console.log(localStorage.getItem("documentTitle"));
    firebase.database().ref().child('files/'+localStorage.getItem("username")).on('value', data => {
    console.log(data.val());
    files = data.toJSON();
    const arrFile=[];
    Object.keys(files).forEach(function (item) {
        console.log(files[item]);
        if (files[item].title === localStorage.getItem("documentTitle")) arrFile.push(files[item]);
        var sorted_files = arrFile.sort((a,b) => {
            return new Date(a.date).getTime() -
                new Date(b.date).getTime()
        }).reverse();
    });
        this.setState ({arrFile: arrFile});
});
    }
    handleData = e => {
        this.setState({
            data: dataTest
        })
    }
    handleSubmit=e =>{
        firebase.database().ref('files/'+localStorage.getItem("username")).push(
            {
                title: localStorage.getItem("documentTitle"),
                version: "version mise en page "+count,
                date : moment().format("DD-MM-YYYY hh:mm:ss"),
                data : this.state.data,
                numberV : count,
            }
        );
        if(!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
        this.setState({
            text: ""
        })
    }
    render() {
        var arrFile= [];
        this.state.arrFile.forEach(item=>{
            if(!arrFile.some(i => i.title === item.title)){
                arrFile.push({...item})
            }
        });
        findVersionNumber(this.state.arrFile);
        return (
            <div>
                    {arrFile.map(item => (
                        <td key={item.title}>

                            <div className="split left">
                                <h1>{item.title}</h1>
                            </div>

                            <div className="split right">
                                <button  onClick={this.handleSubmit} type="button"
                                        className="button" type="submit"
                                >Sauvegarder
                                </button>
                            </div>
                        <div id="breadcrumbNav2">
                            <div id="arrowBar2">
                                        <a> <span className="AB2rotate color0"><span
                                            className="AB2rotateReset"><span
                                            className="AB2text0">Etapes</span></span></span></a>
                                        <a href="/File"> <span className="AB2rotate color1 AB1rotate"><span
                                            className="AB2rotateReset"><span
                                            className="AB2text1">Transcription</span></span></span></a>
                                        <a> <span className="AB2rotate active2"><span
                                            className="AB2rotateReset"><span
                                            className="AB2textActive">Mise en page</span></span></span></a>
                                        <a href="/FindPeople"> <span className="AB2rotate color3 AB1rotate"><span
                                            className="AB2rotateReset"><span
                                            className="AB2text3">Relecture</span></span></span></a>
                            </div>
                        </div>

                            <div className="splitM">
                                <h3>{item.version}</h3>
                            </div>
                        <div className="splitD">
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
                                data={item.data}
                                config={DecoupledEditor}
                            />
                        </div>
                        </td>))}
            </div>
        );
    };
}
export default Layout;