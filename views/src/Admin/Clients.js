import React, {Component} from 'react';
import '../styles/App.scss';
import {view} from 'react-easy-state';
import OrderInfo from './OrderInfo';


class Clients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterLast: 1,
      etiquette_id: null,
      sidewidth: {
        width: 0
      },
      form: false
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
                    <h3 className="box_light2 flex_r">
                      <small><i className="fas fa-user"></i> {p.id}</small>
                      {p.prenom + ' ' + p.nom}
                      <small>{p.userid}</small>

                      {this.props.devis.findIndex(x => x.userid === p.userid) !== -1 ? <a href={"/devis/" + p.userid}> Voir Devis</a> : <a href={"/deviscreate/" + p.userid}> Créer Devis</a> }
                      <a href={"/facture/" + p.userid}>Facturer</a>
                      <a href={"/etiquette/" + p.userid}>Expedier</a>
                      <a href={"/mail/" + p.userid}>Mailer</a>
                    </h3>
                    <div className="flex_r flex_baseline">
                      <OrderInfo sessid = {p.userid}></OrderInfo>
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

export default view(Clients);
