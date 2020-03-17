import React, {Component} from 'react';
import SessionCart from './SessionCart';
import Sessionlivraison from './SessionLivraison';
import SessionPaiement from './SessionPaiement';
import SessionAdresse from './SessionAdresse';

import '../styles/App.scss';


class ClientDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const u = this.props.userid;
    return (<div>
      <h2>Mon Espace Client</h2>
      {
        u
          ? <div>
          <h3 className="box_light2">Mes données personelles</h3>
          <div className="center"><SessionAdresse sessid={u}></SessionAdresse></div>
          <h3 className="box_light2">Mes commandes</h3>
                    <div className="flex_r center flex_baseline">
                      <Sessionlivraison sessid={u}></Sessionlivraison>
                      <SessionCart sessid={u}></SessionCart>
                      <SessionPaiement sessid={u}></SessionPaiement>
                    </div>
                  </div>

          : 'Pas d\'utilisateur enregistré dans la base de donnée'
      }
    </div>)
  }
}

export default ClientDashboard;
