import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import React,{Component} from "react";
import '../Css/Home.css';
import button from "react-bootstrap/Button";
import {Col, Container, Dropdown, DropdownButton, Row, Breadcrumb, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import firebase from 'firebase';
import moment from "moment";

var FileBefore="texte initial";
var dataTest="";
var files;
class File extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrFile: [],
            arrFileChoose: [],
            arrFileBefore: [],
            data: ""
        }
        console.log(localStorage.getItem("documentTitle"));
        firebase.database().ref().child('files/'+localStorage.getItem("username")).on('value', data => {
            console.log(data.val());
            files = data.toJSON();
            const arrFile=[];
            Object.keys(files).forEach(function (item) {
                console.log(files[item]);
                if (files[item].title === localStorage.getItem("documentTitle")) arrFile.push(files[item]);
            });
            //if more than one version exist, we will take this choose before
           if(arrFile.length>1){
               var sorted_files = arrFile.sort((a,b) => {
                   return new Date(a.date).getTime() -
                       new Date(b.date).getTime()
               }).reverse();
                /*const arrFileChosen=[];
                Object.keys(arrFile).forEach(function (item) {
                    console.log(arrFile[item]);
                    if (arrFile[item].version === localStorage.getItem("documentVersion")) arrFileChosen.push(arrFile[item]);});
                    console.log(arrFileChosen);*/
                    //take the version before
                    const arrFileBefore=[];
               Object.keys(arrFile).forEach(function (item) {
                   console.log(arrFile[item]);
                   if (arrFile[item].version === FileBefore) arrFileBefore.push(arrFile[item]);});
               console.log(arrFileBefore);
                    this.setState({
                        arrFileChoose: arrFile,
                        arrFileBefore: arrFileBefore
                    });
           }
           else
                this.setState ({
                    arrFileChoose: arrFile,
                    arrFileBefore : arrFile
                });
            console.log(this.state.arrFile);
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
                version: "version de travail",
                date : moment().format("DD-MM-YYYY hh:mm:ss"),
                data : this.state.data
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

    render(){
        if(!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
        var arrFileC=[];
        var arrFileB= this.state.arrFileBefore;
        this.state.arrFileChoose.forEach(item=>{
            if(!arrFileC.some(i => i.title === item.title)){
                arrFileC.push({...item})
            }
        });
        /*let tmpFileI;
        {arr.map((item) => {
                if (item.value.title == localStorage.getItem("documentTitle")) {
                    tmpFileI = item;
                }
            }
        )};
        console.log(tmpFileI);
        let tmpFile;
        {arr.map((item) => {
                if (item.value.title == localStorage.getItem("documentTitle")) {
                    tmpFile = item;
                }
            }
        )};*/
    return (

        <div>
            {arrFileC.map(item => (
                <td key={item.title}>
                    {arrFileB.map(item2=>(
                        <td key={item2.title}>
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col sm>
                        <div className="Home-title">
                            <h2>{item.title}</h2>
                        </div>
                    </Col>
                    <Col sm>
                        <div className="Home-button">
                            <button type="button" onClick={this.handleSubmit}
                                    className="btn btn-primary btn-lg" type="submit"
                            >Sauvegarder
                            </button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Breadcrumb>
                        <Breadcrumb.Item active>Transcription</Breadcrumb.Item>
                        <Breadcrumb.Item href="/Layout">Mise en page</Breadcrumb.Item>
                        <Breadcrumb.Item href="/FindPeople">Trouver un contact</Breadcrumb.Item>

                    </Breadcrumb>
                </Row>
                <Row className="justify-content-md-center">
                    <Col sm>
                        <div className="Home-title">
                            <h2>{item2.version}</h2>
                        </div>
                    </Col>
                    <Col sm>
                        <div className="Home-title">
                            <h2>{item.version}</h2>
                        </div>
                    </Col>
                </Row>

                <Row className="justify-content-md-center" >
                    <Col sm>
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
                            onChange={(event, editor) => console.log({event, editor})}
                            editor={DecoupledEditor}
                            data={item2.data}
                            config={DecoupledEditor}
                        />
                    </Col>
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
                            data={item.data}
                            config={DecoupledEditor}
                        />
                    </Col>

                </Row>

            </Container>
                        </td>
                    ))}
                </td>))}
        </div>


    );
    }
}

export default File;