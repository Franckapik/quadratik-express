import React, {Component} from 'react';
import CarteRelais from './Relais/CarteRelais';
import {view} from 'react-easy-state';
import commandeStore from '../Store/commandeStore';
import client from '../Store/client';
import RechercheRelais from './Relais/RechercheRelais';
import ChoisirRelais from './Relais/ChoisirRelais';
import DepotColis from './Relais/DepotColis';

class AdminRelais extends Component {
  constructor(props) {
    super(props);
  }

  saveRelais() {
    const r = this.state.relais_selected;
    if (r.code[0]) {
      const values = {
        mode: r.code[0],
        operateur: this.state.transporteur,
        service: this.state.service,
        firstName: r.name[0],
        adresse: r.address[0],
        ville: r.city[0],
        codepostal: r.zipcode[0]
      }

      client.livraisonPost(values).then(res => {
        if (res.ok) {
          commandeStore.display = 'paiement';
          commandeStore.status = '80vw';
        } else {
          window.location = '/500';
        }
      });
    }
  }

  render() {
    return (
  <div className="flex_c">
    <div className="flex_r flex_baseline">
      <div className="flex_c w30">
        <RechercheRelais admin></RechercheRelais>
      </div>
      {/* <CarteRelais marker={[this.state.lat, this.state.long]} center={this.state.adresse + ' ' + this.state.code_postal + ' ' + this.state.ville} admin={this.props.admin}></CarteRelais> */}
      <div className="flex_c relais_liste w30">
        <ChoisirRelais admin ></ChoisirRelais>
      </div>
      <div className="flex_c w30">
        <DepotColis></DepotColis>
      </div>
    </div>
    <div className="flex_r w100 box_light1">
      {
        commandeStore.relais_selected
          ? <form onSubmit={this.saveRelais}>
                  <p>{commandeStore.relais_selected.name[0]}</p>
                  <input type="submit" value="Choisir ce Relais"/>
            </form>
              : <p>Choisissez un relais dans la liste</p>
      }
    </div>
  </div>
    )
  }
}

export default view(AdminRelais);
