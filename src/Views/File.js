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
var count=1;
function findVersionNumber(arr){
    if(arr.length != 0) {
        console.log(arr);
        for (var i = 0; i <= arr.length-1; i++) {
            console.log(arr[i].title)
            if (arr[i].version.includes("travail")) {
                if (count <= arr[i].numberV)
                    count = arr[i].numberV + 1;
            }
        }

    }

}
class File extends Component {
    constructor(props) {
        super(props);
        var container = React.createRef();
        this.state = {
            arrFile: [],
            arrFileChoose: [],
            arrFileBefore: [],
            data: "",
            open: false,
            numberV: count,
            version: "texte initial"
        }
        FileBefore = this.state.version;
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
                console.log(arrFile);
                this.setState({
                    arrFileChoose: arrFile,
                });
            }
            else
                this.setState ({
                    arrFileChoose: arrFile,
                });
        });
    }
    handleButtonClick = () => {
        this.setState(state => {
            return {
                open: !state.open,
            };
        });
    };
    handleData = e => {
        this.setState({
            data: dataTest
        })
    }
    handleSubmit=e =>{
        firebase.database().ref('files/'+localStorage.getItem("username")).push(
            {
                title: localStorage.getItem("documentTitle"),
                version: "version de travail "+count,
                date : moment().format("DD-MM-YYYY hh:mm:ss"),
                data : this.state.data,
                numberV : count
            }
        );
        if(!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
        this.setState({
            text: ""
        })
        count ++;
    }

    render(){
        if(!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
        var arrFileC=[];
        this.state.arrFileChoose.forEach(item=>{
            if(!arrFileC.some(i => i.title === item.title)){
                arrFileC.push({...item})
            }
        });
        var versions=[];
        console.log(arrFileC);
        this.state.arrFileChoose.forEach(item=>{
            if(item.version === FileBefore.toString()){
                versions.push({...item})
            }
        });
        console.log(versions);
        findVersionNumber(this.state.arrFileChoose);
        return (
            <div>
                {arrFileC.map(item => (
                    <td key={item.title}>
                        {versions.map(item2=>(
                            <td key={item2.title}>

                                            <div className="split left">
                                                <h1>{item.title}</h1>
                                            </div>

                                            <div className="split right">
                                                <button type="button" onClick={this.handleSubmit}
                                                        className="button" type="submit"
                                                >Sauvegarder
                                                </button>
                                            </div>
                                        <div id="breadcrumbNav2">
                                            <div id="arrowBar2">
                                                <a> <span className="AB2rotate color0"><span
                                                    className="AB2rotateReset"><span
                                                    className="AB2text0">Etapes</span></span></span></a>
                                                <a> <span className="AB2rotate active1"><span
                                                    className="AB2rotateReset"><span
                                                    className="AB2textActive">Transcription</span></span></span></a>
                                                <a href="/Layout"> <span className="AB2rotate color2 AB1rotate"><span
                                                    className="AB2rotateReset"><span
                                                    className="AB2text2">Mise en page</span></span></span></a>
                                                <a href="/FindPeople"> <span className="AB2rotate color3 AB1rotate"><span
                                                    className="AB2rotateReset"><span
                                                    className="AB2text3">Relecture</span></span></span></a>
                                            </div>
                                        </div>

                                            <div className="splitM left" ref={this.container}>
                                                <h3 type="button" className="button" onClick={this.handleButtonClick}>
                                                    {FileBefore} ☰
                                                </h3>
                                                <div className="dropdown">
                                                {this.state.arrFileChoose.map(item3=>
                                                        <ul key={item3.version}>
                                                            {this.state.open && (

                                                        <li onClick={() =>(FileBefore=item3.version, this.setState({version: item3.version}))}>{item3.version}</li>
                                                            )}
                                                    </ul>

                                                )}
                                                </div>
                                            </div>
                                             <h3 className="splitM right">{item.version}</h3>



                                       <div className="splitD left">
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
                                        </div>
                                        <div className="splitD right">
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




                            </td>
                        ))}
                    </td>))}
            </div>


        );
    }
}

export default File;