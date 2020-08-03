import React, {Component} from 'react';
import {Col, Table, Container, Row, OverlayTrigger, Popover} from "react-bootstrap";
import {Link} from "react-router-dom";
import button from "react-bootstrap/Button";
import firebase from 'firebase';
import moment from "moment";

var messages;
function acceptContact(){
    firebase.database().ref('contact/' + localStorage.getItem("idContact").toString()).update({
        status: "accepté",
        date : moment().format("DD-MM-YYYY hh:mm:ss")
    });
}
function refuseContact(){
    firebase.database().ref('contact/'+localStorage.getItem("idContact").toString()).update({
        status: "refusé",
        date : moment().format("DD-MM-YYYY hh:mm:ss")
    });
}
class Community extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [],
        }
        //take the contact between users and other people
        firebase.database().ref('contact').on('value', data => {
            console.log(data.val());
            messages = data.toJSON();
            const arrMessage = [];
            var idMessage=[];
            if(messages===null){return(null)}
            Object.keys(messages).forEach(function (key) {
                console.log(messages);
                if (messages[key].receiver === localStorage.getItem("userConnected") && messages[key].status==="en attente") {
                    arrMessage.push({name: key, value: messages[key]});
                }
                console.log(arrMessage);

            });

            this.setState({arr: arrMessage});
        });
    }
    render() {
        if(!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
        var arrMessage = this.state.arr;
        return (
            <div>
                <Container fluid>
                    <Row>
                        <Col>
                            <h1>Documents en attente d'acceptation</h1>
                        </Col>
                        <Col>
                                <Link to={"/CommunityO"}>
                                    <button type="button"
                                            className="buttonMenu" type="submit"
                                    >Retour
                                    </button>
                                </Link>
                        </Col>
                    </Row>
                </Container>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>Personne</th>
                        <th>Document</th>
                        <th>Commentaire</th>
                    </tr>
                    </thead>
                    <tbody>
                    {arrMessage.map(item => (
                        <tr key={item.value.date}>
                            {console.log(localStorage.getItem("idContact"))}
                            <td>{item.value.sender}</td>
                            <td>{item.value.title}</td>
                            <td>
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
                                    <button className="buttonTable">Message</button>
                                </OverlayTrigger>
                            </td>
                            <td>
                                <Link to="/CommunityO"
                                      onClick={() => (localStorage.setItem("idContact", item.name),acceptContact())}>
                                    Accepter
                                </Link>
                            </td>
                            <td>
                                <Link to="/CommunityO" style={{color: "red"}}
                                      onClick={() => (localStorage.setItem("idContact", item.name),refuseContact())}>
                                    Refuser
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