import React, {Component} from 'react';
import SessionCart from './SessionCart';
import Sessionlivraison from './SessionLivraison';
import SessionPaiement from './SessionPaiement';
import SessionAdresse from './SessionAdresse';
import SessionServices from './SessionServices';
import '../styles/App.scss';
import client from '../Store/client';

class Clients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterLast: 1,
      etiquette_id : null,
      sidewidth: {
        width: 0
      }
    }
  }

  render() {
    return (<div>
      <h2>Mes clients</h2>
      {
        this.props.user
          ? <div>

              <ul className="flex_r filter">
                <li className="cursor" onClick={() => this.setState({filterLast: this.props.user.length})}>Tous les clients</li>
                <li className="cursor" onClick={() => this.setState({filterLast: 20})}>
                  20</li>
                <li className="cursor" onClick={() => this.setState({filterLast: 10})}>
                  10</li>
                <li className="cursor" onClick={() => this.setState({filterLast: 5})}>5</li>
                <li className="cursor" onClick={() => this.setState({filterLast: 1})}>Dernier client</li>
              </ul>

              {
                this.props.user.sort(function(a, b) {
                  return a.id - b.id
                }).slice(Math.max(this.props.user.length - this.state.filterLast, 0)).map((p, i) => {
                  return (<div key={i}>
                    <h3 className="box_light2">
                      <i className="fas fa-user"></i>
                      <small>{p.id}</small>
                      {p.prenom + ' ' + p.nom}
                      <small>{p.userid}</small>
                    </h3>
                    <div className="flex_r flex_baseline">
                      <SessionAdresse sessid={p.userid}></SessionAdresse>
                      <Sessionlivraison sessid={p.userid}></Sessionlivraison>
                      <SessionCart sessid={p.userid}></SessionCart>
                      <SessionPaiement sessid={p.userid}></SessionPaiement>
                      <SessionServices sessid={p.userid} mail facture suivi etiquette></SessionServices>
                    </div>
                  </div>);
                })
              }
            </div>
          : 'Pas d\'utilisateur enregistré dans la base de donnée'
      }
    </div>)
  }
}

export default Clients;
