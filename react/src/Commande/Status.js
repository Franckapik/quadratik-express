import React, {Component} from 'react';
import '../styles/App.scss';
import commandeStore from '../Store/commandeStore';
import {view} from 'react-easy-state';

class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activated : 5
    };
  }

  render() {

    let statuswidth = {
      width: commandeStore.status
    }

    return (<div className="status_container">
      <ul className="flex_r center">
        <li>
          <p className={this.props.statut === 'enregistrement' ? 'status_activated' : null}>1</p>Enregistrement</li>
        <li>
          <p className={this.props.statut === 'livraison' ? 'status_activated' : null}>2</p>Livraison</li>
        <li>
          <p className={this.props.statut === 'paiement' ? 'status_activated' : null}>3</p>Paiement</li>
        <li>
          <p className={this.props.statut === 'success' ? 'status_activated' : null}>4</p>Récapitulatif</li>
      </ul>
      <div className="commande_status" style={statuswidth}></div>
    </div>)
  }
}

export default view(Status);
