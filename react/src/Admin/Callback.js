import React, {Component} from 'react';
import auth0Client from './Auth';

class Callback extends Component {
  async componentDidMount() {
    await auth0Client.handleAuthentication();
    console.log(auth0Client.getIdToken());
    window.location = "/admin";
  }

  render() {
    return (
      <p>Chargement de l'admin </p>
    );
  }
}

export default Callback;
