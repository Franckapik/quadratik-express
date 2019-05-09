import React from "react";
import DropIn from "braintree-web-drop-in-react";
import commandeStore from './commandeStore';

class Braintree extends React.Component {
  instance;
  state = {
    clientToken: null
  };

  async componentDidMount() {
    // Get a client token for authorization from your server
    const response = await fetch("/paiement/client_token");
    const clientToken = await response.json();

    this.setState({clientToken});
  }

  async buy() {
    // Send the nonce to your server
    const {nonce} = await this.instance.requestPaymentMethod();
    const response2 = await fetch(`/paiement/nonce/${nonce}`,  {
  method: 'GET',
  credentials: 'same-origin',
});
    commandeStore.facture = await response2.json();
/*    const mail = await fetch('/sendMail/facture', {
      credentials: 'include',
      method: 'post',
      body: JSON.stringify(commandeStore.facture),
      headers: new Headers({'Content-Type': 'application/json'})
    });
    console.log(mail);*/
    commandeStore.status = '100vw';
    commandeStore.display = 'success';
  }

  render() {
    if (!this.state.clientToken) {
      return (<div>
        <h2>Chargement...</h2>
      </div>);
    } else {
      return (<div>
        <DropIn options={{
            authorization: this.state.clientToken,
            locale: 'fr_FR,'
          }} onInstance={instance => (this.instance = instance)}/>
        <button onClick={this.buy.bind(this)}>Régler la commande</button>
      </div>);
    }
  }
}

export default Braintree;
