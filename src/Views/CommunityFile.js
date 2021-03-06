import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import React,{Component} from "react";
import '../Css/Home.css';
import button from "react-bootstrap/Button";
import {Col, Container, Dropdown, DropdownButton, Row, Breadcrumb, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import firebase from 'firebase';
import moment from "moment";
import Confirm from '../Components/Confirm';
import "@reach/dialog/styles.css";
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
var files;
var dataTest="";
var count=1;
function findVersionNumber(arr){
    if(arr.length != 0) {
        console.log(arr);
        for (var i = 0; i <= arr.length-1; i++) {
            console.log(arr[i].title)
            if (arr[i].version.includes("relue")) {
                if (count <= arr[i].numberV)
                    count = arr[i].numberV + 1;
            }
        }

    }

}
class CommunityFile extends Component {
    constructor(props) {
        super(props);
        this.state= {
            arrFileChoose : [],
            data: ""
        };
        firebase.database().ref().child('files/'+localStorage.getItem("sender")).on('value', data => {
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

        /*firebase.database().ref().child('files/'+localStorage.getItem("sender")).on('value', data => {
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
        });*/
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
                version: "version à relire "+count,
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
    handleSubmit2=e =>{
        firebase.database().ref('files/'+localStorage.getItem("sender")).push(
            {
                title: localStorage.getItem("documentTitle"),
                version: "version relue" + count,
                date : moment().format("DD-MM-YYYY hh:mm:ss"),
                data : this.state.data,
                numberV : count

            }
        );
        firebase.database().ref('contact/' + localStorage.getItem("idMessage").toString()).update({
            status: "terminé",
            date : moment().format("DD-MM-YYYY hh:mm:ss")
        });
        if(!window.location.hash) {
            window.location = '/CommunityO';
        }
        this.setState({
            text: ""
        })
    }
    render(){
        var files = this.state.arrFileChoose;
        var arrFileC=[];
        var arrFileI= [];
        this.state.arrFileChoose.forEach(item=>{
            if(!arrFileC.some(i => i.title === item.title)){
                arrFileC.push({...item})
            }
        });
        Object.keys(files).forEach(function (item) {
            console.log(files[item]);
            if (files[item].version === "texte initial") arrFileI.push(files[item]);
        });
        console.log(localStorage.getItem("idMessage"));
        findVersionNumber(this.state.arrFileChoose);
        return (
           <div>
                {arrFileC.map(item => (
                    <td key={item.title}>
                        {arrFileI.map(item2=>(
                            <td key={item2.title}>

                                <div className="split left">
                                    <h1>{item.title}</h1>
                                </div>
                                <div className="split right">
                                    <button type="button" onClick={this.handleSubmit}
                                            className="buttonMenu" type="submit"
                                    >Sauvegarder
                                    </button>
                                </div>
                                <div className="split rightT">
                                    <Confirm title ="Confirmation" description ="Etes-vous sûr d'avoir terminer la relecture ? ">
                                        {confirm=>(
                                        <button
                                                className="buttonMenu" type="submit" onClick={confirm(this.handleSubmit2)}
                                        >Terminer
                                        </button>
                                        )}
                                    </Confirm>
                                </div>

                                <div className="splitMCommunity left">
                                    <h2>{item2.version}</h2>
                                </div>


                                <div className="splitMCommunity right">
                                    <h2>{item.version}</h2>
                                </div>


                                <div className="splitDCommunity left">
                                    <p>{item2.data}</p>
                                </div>
                                <div className="splitDCommunity right">
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
                                        dataTest ={item.data}
                                    />
                                </div>
                            </td>
                        ))}
                    </td>))}
            </div>
        );
    }
}

export default CommunityFile;