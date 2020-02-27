import React, {Component} from 'react';
import '../styles/App.scss';
import Etiquette from './Etiquette';
import Facture from './Facture';
import Mail from './Mail';
import Suivi from './Suivi';

class SessionServices extends Component {
  render() {
    const u = this.props.sessid;
  return (
    <div className="client_column"> <h3>Adresse</h3>
{ u ?

  <ul className="client_column box_light1">
    {this.props.etiquette ? <Etiquette id= {u}></Etiquette> : null}
    {this.props.facture ? <Facture id= {u}></Facture> : null}
    {this.props.mail ? <Mail id= {u}></Mail> : null}
    {this.props.suivi ? <Suivi id= {u}></Suivi> : null}
  </ul>
  : null
} </div>

)
}
}


export default SessionServices;
