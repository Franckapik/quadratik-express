import React, { Component } from 'react';
import './App.css';
import commandeStore from './commandeStore';
import {view} from 'react-easy-state';

class Status extends Component {
  render() {

    let statuswidth = {width : commandeStore.status}

    return (
      <div><ul className="flex_r center"><li><p className="status_number">1</p>Enregistrement</li><li><p className="status_number">2</p>Livraison</li><li><p className="status_number">3</p>Paiement</li><li><p className="status_number">4</p>Recapitulatif</li></ul>
      <div className="commande_status" style={statuswidth}>
      </div></div>


    )
  }
}

export default view(Status);
