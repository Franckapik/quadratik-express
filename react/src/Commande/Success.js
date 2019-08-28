import React from "react";
import '../App.scss';
import {view} from 'react-easy-state';
import shopStore from '../Store/shopStore';


class Paiement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commande: false
    };
  }

  componentDidMount() {
    fetch('/getFromDB/commande', {
        credentials: 'include',
        method: 'GET',
        mode: "cors" // no-cors, cors, *same-origin
      }).then(response => response.json()).then(data => {
        console.log(data);
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
                <li>Type de carte : {c.cardType}</li>
                <li>Date d'expiration{c.expirationDate}</li>
            </ul>

      Merci pour votre confiance !
      Vous devriez recevoir un mail de confirmation à l'adresse indiquée lors de votre commande.

    </div> : null
    )
  }
}

export default view(Paiement);
