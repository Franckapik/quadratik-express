import React from "react";
import '../styles/App.scss';
import {view} from 'react-easy-state';
import shopStore from '../Store/shopStore';
import client from '../Store/client';


class Paiement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commande: false
    };
  }

  componentDidMount() {
    client.commandeFetch().then(data => {
      this.setState({
        commande: data
      });
    });
  }

  render() {
    const c = this.state.commande;
    shopStore.resetCart();
    return ( this.state.commande ?
      <div className="center">
            <h1>Félicitation, votre transaction a bien été enregistrée !</h1>
            <ul>
                <li>Transaction : {c.id}</li>
                <li>Montant : {c.amount}</li>
                <li>Type de carte : {c.cardtype}</li>
                <li>Date d'expiration: {c.expirationdate}</li>
            </ul>

      Merci pour votre confiance !
      Vous devriez recevoir un mail de confirmation à l'adresse indiquée lors de votre commande.

    </div> : null
    )
  }
}

export default view(Paiement);
