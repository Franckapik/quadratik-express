import React, {Component} from 'react';
import './App.css';
import Enregistrement from './Enregistrement'
import Livraison from './Livraison'
import Paiement from './Paiement'
import Success from './Success'
import Status from './Status'
import shopStore from './shopStore'
import commandeStore from './commandeStore'
import {view} from 'react-easy-state';

class Commande extends Component {
  componentDidMount() {
    shopStore.getSessionCart();
  }

  render() {
    return (<div>
      <Status></Status>
      <div className='flex_r commande_container'>
        <div className='commande_forms_container'>
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
