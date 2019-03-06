import React, { Component } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import openSocket from 'socket.io-client';
import 'react-chat-widget/lib/styles.css';
import logo from './logo_black.svg';

const socket = openSocket('/');

class Messenger extends Component {
  componentDidMount() {
    addResponseMessage("Discutons de votre projet de studio! :)");
    socket.on('connection');
    socket.on('Serverclient', (response) => addResponseMessage(response));
  }

/* Envoi vers serveur */
  handleNewUserMessage = (newMessage) => {
    console.log(`Nouveau message ! ${newMessage}`);
    socket.emit('clientServer', newMessage);
  }

  render() {
    return (
      <div className="App">
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          profileAvatar={logo}
          title="Quadra-Messenger"
          subtitle="Partagez-nous vos idées et vos questions!"
        />
      </div>
    );
  }
}

export default Messenger;
