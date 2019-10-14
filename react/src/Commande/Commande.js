import React, {Component} from 'react';
import '../styles/App.scss';
import Enregistrement from './Enregistrement'
import Livraison from './Livraison'
import Paiement from './Paiement'
import Success from './Success'
import Status from './Status'
import shopStore from '../Store/shopStore'
import commandeStore from '../Store/commandeStore'
import {view} from 'react-easy-state';

class Commande extends Component {
  componentDidMount() {
    shopStore.getSessionCart();
  }

  render() {
    return (<div>
      <Status statut = {commandeStore.display}></Status>
      <div className='flex_r'>
        <div>
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

      </div>
    </div>)
  }
}

export default view(Commande);
