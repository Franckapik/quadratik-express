import React from "react";
import DropIn from "braintree-web-drop-in-react";
import commandeStore from '../Store/commandeStore';
import Success from './Success';

class Braintree extends React.Component {
  instance;
  state = {
    clientToken: null,
    ticket : null,
    success : false
  };

  componentDidMount() {
    // Get a client token for authorization from your server
    fetch("/paiement/client_token")
      .then(response => response.json())
      .then(data => {
        this.setState({clientToken: data})
      });

  }

  buy() {
    // Send the nonce to your server
    return this.instance.requestPaymentMethod()
    .then(({nonce}) => fetch(`/paiement/nonce/${nonce}`, {
    method: 'GET',
    credentials: 'include',
  }))
  .then(resp => resp.json())
  .then(res => {
    console.log(res);
    if (res.result.success) {
      this.setState({
        clientToken : false,
        ticket : res,
        success : true
      })
      commandeStore.status = '100vw';
      commandeStore.display='success'
    } else {
      console.log("Erreur : ", res.result.transaction.status);
    }
  });

  }

  render() {
    return(<>
      {this.state.success ? <Success ticket={this.state.ticket}></Success> : null}
    {!this.state.success? <div>{this.state.clientToken?
      <div>
        <DropIn options={{
            authorization: this.state.clientToken,
            locale: 'fr_FR,'
          }} onInstance={instance => (this.instance = instance)}/>
        <button className="button_accent" onClick={this.buy.bind(this)}>Régler la commande</button>
      </div>
      : 'Chargement...'}</div> : null}
      </>
    )
  }
}

export default Braintree;
