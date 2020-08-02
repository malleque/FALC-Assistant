import React, {Component} from 'react';
import {Col, Table, Container, Row, Popover, Button, OverlayTrigger} from "react-bootstrap";
import {Link} from "react-router-dom";
import firebase from 'firebase';

var messages;
var users;
function deleteFile(titleToDelete){
    firebase.database().ref('contact/'+titleToDelete.toString()).remove();
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}
class Community extends Component {
    constructor(props){
        super(props);
        this.state = {
            arr: [],
        }
        //take the contact between users and other people
        firebase.database().ref().child('contact').on('value', data => {
            console.log(data.val());
            messages = data.toJSON();
            const arrMessage = [];
            if(messages===null){return(null)}
            Object.keys(messages).forEach(function (key) {
                console.log(messages[key]);
                if (messages[key].sender === localStorage.getItem("userConnected")) arrMessage.push({name: key, value: messages[key]});
            });
            var sorted_files = arrMessage.sort((a,b) => {
                return new Date(a.value.date).getTime() -
                    new Date(b.value.date).getTime()
            }).reverse();
            console.log(arrMessage);
            this.setState({arr: arrMessage});
        });
    }

    render(){
        if(!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
        var arrMessage = this.state.arr;
        console.log(arrMessage);
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h1>Documents relus</h1>
                    </Col>
                </Row>
            </Container>


            <Table responsive>
                <thead>
                <tr>
                    <th>Receiver</th>
                    <th>message</th>
                    <th>Document</th>
                    <th>statut</th>
                    <th>Modifié le...</th>
                </tr>
                </thead>
                <tbody>
                {arrMessage.map(item=>(
                    <tr key={item.value.date}>
                        <td>{item.value.receiver}</td>
                        <OverlayTrigger
                            trigger="click"
                            key={'top'}
                            placement={'top'}
                            overlay={
                                <Popover id={`popover-positioned-top`}>
                                    <Popover.Title as="h3">{`Message:`}</Popover.Title>
                                    <Popover.Content>
                                        {item.value.message}
                                    </Popover.Content>
                                </Popover>
                            }
                        >
                            <Button variant="primary">Message</Button>
                        </OverlayTrigger>
                        <td>
                            <Link to="/File" onClick={() =>(localStorage.setItem("documentTitle", item.value.title))}>
                                {item.value.title}
                            </Link>
                            </td>
                        <td>{item.value.status}</td>
                        <td>{item.value.date}</td>
                        <td>
                            <Link to="/File"
                                  onClick={() =>(localStorage.setItem("documentTitle", item.id))}>
                                {item.document}
                            </Link>
                        </td>
                        <td>{item.modification}</td>
                        <td>{item.version}</td>
                        <td><Link to="/Chat" onClick={()=>(localStorage.setItem("receiver", item.value.receiver))} style={{color:"green"}} >
                            Chat
                        </Link>
                        </td>
                        <td>
                        <Link onClick={()=>(deleteFile(item.name))} style={{color:"red"}} >
                            Supprimer
                        </Link>
                        </td>

                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
    };
}
export default Community