import React, { Component } from 'react';
import './App.css';
import commandeStore from './commandeStore';
import {view} from 'react-easy-state';

class Paiement extends Component {
  render() {
    return (
      <div>

          <div>
            <h1>Félicitation, votre transaction a bien été enregistrée !</h1>
            <ul><li>{commandeStore.facture.reference}</li>
            <li>{commandeStore.facture.result.transaction.id}</li>
            <li>{commandeStore.facture.result.transaction.amount}</li>
            <li>{commandeStore.facture.result.transaction.creditCard.cardType}</li>
            <li>{commandeStore.facture.result.transaction.creditCard.expirationDate}</li>
      </ul>

      Merci de nous avoir choisi !

      Vous devriez recevoir un mail de confirmation à l'adresse indiquée lors de votre commande.

        </div>

        </div>
    )
  }
}

export default view(Paiement);
