import React, {Component} from 'react';
import {Col, Table, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import button from "react-bootstrap/Button";
import firebase from 'firebase';

var messages;
var users;
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
            Object.keys(messages).forEach(function (item) {
                console.log(messages[item]);
                if (messages[item].sender === localStorage.getItem("userConnected")) arrMessage.push(messages[item]);
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
                    <tr key={item.date}>
                        <td>{item.receiver}</td>
                        <td>{item.message}</td>
                        <td>{item.title}</td>
                        <td>{item.status}</td>
                        <td>{item.date}</td>
                        <td>
                            <Link to="/File"
                                  onClick={() =>(localStorage.setItem("documentTitle", item.id))}>
                                {item.document}
                            </Link>
                        </td>
                        <td>{item.modification}</td>
                        <td>{item.version}</td>

                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
    };
}
export default Community