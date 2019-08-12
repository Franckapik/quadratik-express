import React, { Component } from 'react';
import '../App.scss';
import {view} from 'react-easy-state';

class Paiement extends Component {
  render() {
  const ticket = this.props.ticket;
    return (
      <div>
            <h1>Félicitation, votre transaction a bien été enregistrée !</h1>
            <ul>
                <li>Transaction : {ticket.result.transaction.id}</li>
                <li>Montant : {ticket.result.transaction.amount}</li>
                <li>Type de carte : {ticket.result.transaction.creditCard.cardType}</li>
                <li>Date d'expiration{ticket.result.transaction.creditCard.expirationDate}</li>
            </ul>

      Merci pour votre confiance !
      Vous devriez recevoir un mail de confirmation à l'adresse indiquée lors de votre commande.

        </div>
    )
  }
}

export default view(Paiement);
