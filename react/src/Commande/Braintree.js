import React from "react";
import DropIn from "braintree-web-drop-in-react";
import commandeStore from '../Store/commandeStore';
import Success from './Success';

class Braintree extends React.Component {
  instance;
  state = {
    clientToken: null,
    transactionid : null
  };

  componentDidMount() {
    // Get a client token for authorization from your server
    fetch("/paiement/client_token").then(response => response.json()).then(data => {
      this.setState({clientToken: data})
    });

  }

  buy = () => {
    this.instance.requestPaymentMethod().then(({nonce}) => fetch(`/paiement/nonce/${nonce}`, {
      method: 'GET',
      credentials: 'include'
    }).then(response => {
      if (response.ok) {
        commandeStore.display = 'success';
        commandeStore.status = '100vw';
        response.json()
      } else {
        console.log(response)
      }
    })
  );
  }

  render() {
    return (
    <> {
      this.state.success
        ? <Success ></Success>
        : <div>{
              this.state.clientToken
                ? <div>
                    <DropIn options={{
                        authorization: this.state.clientToken,
                        locale: 'fr_FR,'
                      }} onInstance={instance => (this.instance = instance)}/>
                    <button className="button_accent" onClick={this.buy.bind(this)}>Régler la commande</button>
                  </div>
                : 'Chargement...'
            }</div>
    }</>
    )
  }
}

export default Braintree;
