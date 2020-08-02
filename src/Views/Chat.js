import React, {Component} from 'react';
import firebase from 'firebase';
import moment from "moment";
import '../Css/Chat.css';
import {Row, Container, Col} from 'react-bootstrap';
import button from "react-bootstrap/Button";
var messages=[];
var data;
class Chat extends Component{
    constructor(props){
        super(props);
    this.state = ({
        value: "",
        arrMessages: [],
    })
        firebase.database().ref().child('messages').on('value',data => {
            console.log(data.val());
            messages = data.toJSON();
            const arrMessages = [];
            if (messages === null) {
                return (null)
            }
            Object.keys(messages).forEach(function (key) {
                console.log(messages);
                if (messages[key].sender === localStorage.getItem("userConnected") || messages[key].receiver === localStorage.getItem("userConnected")) {
                    arrMessages.push({name: key, value: messages[key]});
                    console.log(arrMessages);
                }
            });
            this.setState({
                arrMessages: arrMessages,
            });
        });
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
        data= this.state.value;
    }
    handleSubmit(event){
        firebase.database().ref('messages').push(
            {
                sender: localStorage.getItem("userConnected"),
                receiver: localStorage.getItem("receiver"),
                date : moment().format("DD-MM-YYYY hh:mm:ss"),
                data : data,
            }
        );
        alert('Votre message a bien été envoyé');
        event.preventDefault();
        if(!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
    }
    render(){
        var arrMessages = this.state.arrMessages;
        console.log(arrMessages);
    return(
        <div>

            <Container>
                <Row>
                    <Col>
                        <h1>{localStorage.getItem("receiver")}</h1>
                    </Col>
                </Row>

                    {arrMessages.map(item=>(
                        <Row>
                        <td key = {item.value.date}>


                                <Col>
                                    <h2>{item.value.sender}</h2>
                                </Col>
                                <Col>
                                    <p>{item.value.data}</p>
                                </Col>

                        </td>
                        </Row>
                    ))}

                <Row>
            <label>Ecrivez votre message</label>
                    </Row>
                <Row>
            <textarea value={this.state.value} onChange={this.handleChange}/>
                </Row>
                <Row>
            <button type="button" onClick={this.handleSubmit}
                    className="btn btn-primary btn-lg" type="submit"
            >Envoyer
            </button>
                </Row>
            </Container>
        </div>
    );
    };
}
export default Chat;