import React, {Component} from 'react';
import {Link} from "react-router-dom";
import button from "react-bootstrap/Button";
import {Col, Container, Row, Table, Button, Overlay, Popover, Form, Dropdown, DropdownButton} from "react-bootstrap";
import '../Css/Home.css';
import firebase from 'firebase';
var filesToDelete;
function deleteFile(titleToDelete){
    console.log(titleToDelete);
    firebase.database().ref().child('files/'+localStorage.getItem("username")).on('value',data => {
        console.log(data.val());
        filesToDelete = data.toJSON();
        const arrMessage = [];
        if(filesToDelete===null){return(null)}
        Object.keys(filesToDelete).forEach(function (key) {
            console.log(filesToDelete);
            if (filesToDelete[key].title === titleToDelete){
                arrMessage.push({name: key, value: filesToDelete[key] });
                console.log(arrMessage);
                arrMessage.map(item => (
                    firebase.database().ref('files/'+localStorage.getItem("username")+'/'+item.name.toString()).remove()
                ));
            }
        });
    });
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }

}
var files;
    class Files extends Component{
        constructor(props) {
            super(props);
            this.state = {
                arr: [],
                fileToDelete: ""
            }
        }

        componentDidMount(){
            console.log('mounted')
          firebase.database().ref().child('files/'+localStorage.getItem("username")).on('value', data =>{
              console.log(data.val());
              files = data.toJSON();
              const arr = [];
              if(files===null){return(null)}
              Object.keys(files).forEach(key => arr.push({name: key, value: files[key]}))
              var sorted_files = arr.sort((a,b) => {
                  return new Date(a.value.date).getTime() -
                      new Date(b.value.date).getTime()
              }).reverse();
              //console.log(arr[0].value.date);
              this.setState({arr});
          });
        }
        render() {
            var filterArray=[];
        var arr=this.state.arr;
        //filter to have only one time every file with the latest version
        this.state.arr.forEach(item=>{
            if(!filterArray.some(i => i.value.title === item.value.title)){
                filterArray.push({...item})
            }
        });
            console.log(arr);
            console.log(filterArray);
            return (

                <Container fluid>
                    <Row className="justify-content-md-center">
                        <Col sm>
                            <div className="Home-title">
                                <h1>Documents</h1>
                            </div>
                        </Col>
                        <Col>
                            <Link to={"/NewFile"}>
                                <button className="button">Nouveau</button>
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div>
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th>Titre</th>
                                        <th>Version</th>
                                        <th>Date</th>
                                        <th/>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {filterArray.map(item => (
                                        <tr key={item.value.date}>
                                            <td style={{color:"blue"}} onClick={() => (localStorage.setItem("documentTitle", item.value.title), localStorage.setItem("documentVersion",item.value.version), window.location = '/File')}>{item.value.title}</td>
                                            <td onClick={() => (localStorage.setItem("documentTitle", item.value.title), localStorage.setItem("documentVersion",item.value.version), window.location = '/File')}>{item.value.version}</td>
                                            <td onClick={() => (localStorage.setItem("documentTitle", item.value.title), localStorage.setItem("documentVersion",item.value.version), window.location = '/File')}>{item.value.date}</td>
                                            <td><Link to="/Files" onClick={()=>(deleteFile(item.value.title))} style={{color:"red"}} >
                                                Supprimer
                                            </Link>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
export default Files;