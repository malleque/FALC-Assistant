import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import React,{Component} from "react";
import '../Css/Home.css';
import button from "react-bootstrap/Button";
import {Col, Container, Dropdown, DropdownButton, Row, Breadcrumb, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import firebase from 'firebase';
import moment from "moment";
import GetUser from "../Components/GetUser";
/*function getUser(){
    const user = [];
    firebase.database().ref().child('users').on('value', data =>{
        console.log(data.val());
        sender=data.toJSON();

        Object.keys(sender).forEach(function(key){

            if(sender[key].email===localStorage.getItem("sender")){
                user.push(sender[key]);
            }
        });
        this.setState({arrUser : user});
    });*/

var dataTest="";
class CommunityFile extends Component {
    constructor(props) {
        super(props);
        this.state= {
        arrFileChoose : [],
            arrFileBefore: [],
            data: ""
        };

        firebase.database().ref().child('files/'+localStorage.getItem("sender")).on('value', data => {
            var file;
            console.log(data.val());
            file = data.toJSON();
            const arrFile=[];
            Object.keys(file).forEach(function (item) {
                console.log(file[item]);
                if (file[item].title === localStorage.getItem("documentName")) arrFile.push(file[item]);
            });
            //if more than one version exist, we will take this choose before
            if(arrFile.length>1){
                var sorted_files = arrFile.sort((a,b) => {
                    return new Date(a.date).getTime() -
                        new Date(b.date).getTime()
                }).reverse();
                const arrFileChosen=[];
                Object.keys(arrFile).forEach(function (item) {
                    console.log(arrFile[item]);
                    if (arrFile[item].version === localStorage.getItem("documentVersion")) arrFileChosen.push(arrFile[item]);});
                    console.log(arrFileChosen);
                //take the version before
                const arrFileinit=[];
                Object.keys(arrFile).forEach(function (item) {
                    console.log(arrFile[item]);
                    if (arrFile[item].version === "texte initial") arrFileinit.push(arrFile[item]);});
                console.log(arrFileinit);
                this.setState({
                    arrFileChoose: arrFile,
                    arrFileBefore: arrFileinit
                });
            }
            else
                this.setState ({
                    arrFileChoose: arrFile,
                    arrFileBefore : arrFile
                });
        });
}
    handleData = e => {
        this.setState({
            data: dataTest
        })
    }
    handleSubmit=e =>{
        firebase.database().ref('files/'+localStorage.getItem("sender")).push(
            {
                title: localStorage.getItem("documentTitle"),
                version: "version relue",
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
    handleSubmit2=e =>{
        firebase.database().ref('files/'+localStorage.getItem("sender")).push(
            {
                title: localStorage.getItem("documentTitle"),
                version: "version relue",
                date : moment().format("DD-MM-YYYY hh:mm:ss"),
                data : this.state.data
            }
        );
        firebase.database().ref('contact/' + localStorage.getItem("idMessage").toString()).update({
            status: "terminé",
            date : moment().format("DD-MM-YYYY hh:mm:ss")
        });
        if(!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
        this.setState({
            text: ""
        })
    }
    render(){
        var arrFileC=[];
        var arrFileB= this.state.arrFileBefore;
        this.state.arrFileChoose.forEach(item=>{
            if(!arrFileC.some(i => i.title === item.title)){
                arrFileC.push({...item})
            }
        });
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
                                        <Col sm>
                                            <div className="Home-button">
                                                <Link to="/CommunityO" onClick={this.handleSubmit2}>
                                                <button type="button"
                                                        className="btn btn-primary btn-lg" type="submit"
                                                >Terminer
                                                </button>
                                                </Link>
                                            </div>
                                        </Col>
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
                                    <div className="text-div">
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
                                    </div>

                                </Container>
                            </td>
                        ))}
                    </td>))}
            </div>



        );
    }
}

export default CommunityFile;