import React, {Component} from 'react';
import firebase from 'firebase';
import moment from "moment";
import '../Css/Chat.css';
import {Row, Container, Col} from 'react-bootstrap';
import button from "react-bootstrap/Button";

var messages = [];
var data;
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            value: "",
            arrMessages: [],
        })
        firebase.database().ref().child('messages').on('value', data => {
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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});

    }

    handleSubmit(event) {

        firebase.database().ref('messages').push(
            {
                sender: localStorage.getItem("userConnected"),
                receiver: localStorage.getItem("receiver"),
                date: moment().format("DD-MM-YYYY hh:mm:ss"),
                data: data,
            }
        );
        alert('Votre message a bien été envoyé');
        event.preventDefault();
        if (!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
        this.setState({value : ""});
    }

    render() {
        const arrMessages = this.state.arrMessages;
        console.log(arrMessages);
        data=this.state.value;
        console.log(data);
        return (
            <div>
                <div className="splite">
                    <h1>Contact : {localStorage.getItem("receiver")}</h1>
                </div>
                <div className="spliteM left">

                    {arrMessages.map(item => (
                        <ul key={item.value.date}>
                            <li>
                                <h3>{item.value.sender} a écrit à {item.value.date}:</h3>
                            </li>
                            <li>
                                {item.value.data}

                            </li>

                        </ul>
                    ))}
                </div>
                <div className="spliteD">
                    <textarea className="textsend" data={this.state.value} onChange={this.handleChange}/>

                    <button type="button" onClick={(this.handleSubmit)}
                            className="buttonsend" type="submit"
                    >Envoyer
                    </button>
                </div>
            </div>
        );
    };
}

export default Chat;