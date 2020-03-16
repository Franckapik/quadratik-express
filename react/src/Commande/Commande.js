import React, {Component} from 'react';
import '../styles/App.scss';
import Enregistrement from './Enregistrement'
import Livraison from './Livraison'
import Paiement from './Paiement'
import Success from './Success'
import Status from './Status'
import panier, {panierOperations} from '../Store/shopStore';
import commandeStore from '../Store/commandeStore'
import {view} from 'react-easy-state';
import client from '../Store/client';



class Commande extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cart : 'null'
    };
  }
  componentDidMount() {
    panierOperations.getLocalCart();

    client.cartFetch(panier.cartid)
    .then(cart => {
      this.setState({
        cart: cart[0]
      });
    });
  }

  render() {
    return (<div>
      <Status statut = {commandeStore.display}></Status>
        {this.state.cart ?
          <div className="box_light4">
          <div>Montant de la commande : {panier.montantHorsFdp} €</div>
          <div>Frais de ports : {panier.fdp} €</div>
          <div>Total de la transaction : {panier.montantTotal} €</div>
          </div>
         :null }
      <div className='flex_r fullsize'>

          {
            commandeStore.display === 'enregistrement'
              ? <Enregistrement></Enregistrement>
              : null
          }
          {
            commandeStore.display === 'livraison'
              ? <Livraison></Livraison>
              : null
          }
          {
            commandeStore.display === 'paiement'
              ? <Paiement></Paiement>
              : null
          }
          {
            commandeStore.display === 'success'
              ? <Success></Success>
              : null
          }
      </div>
    </div>)
  }
}

export default view(Commande);
