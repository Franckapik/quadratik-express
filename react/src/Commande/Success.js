import React from "react";
import '../styles/App.scss';
import {view} from 'react-easy-state';
import {panierOperations} from '../Store/shopStore';
import client from '../Store/client';


class Paiement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commande: false
    };
  }

  componentDidMount() {
    this.getOrder(this.props.match.params.orderid);
  }

  getOrder(id) {
    client.commandeFetch(id)
    .then(data => {
      this.setState({
        commande: data
      });
    });

  }

  render() {
    const c = this.state.commande;

    return ( this.state.commande ?
      <div className="center">
            <h1>Félicitation, votre transaction a bien été enregistrée !</h1>
            <ul>
                <li>Transaction : {c.transactionid ? c.transactionid : "En attente de validation" }</li>
                <li>Montant : {c.amount}</li>
                <li>{ c.expirationdate ? 'Date d expiration:' + c.expirationdate : null}</li>
            </ul>

      Merci pour votre confiance !
      Vous devriez recevoir un mail de confirmation à l'adresse indiquée lors de votre commande.

    </div> : null
    )
  }
}

export default view(Paiement);
