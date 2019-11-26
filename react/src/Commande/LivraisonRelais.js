import React, {Component} from 'react';
import CarteRelais from '../Admin/Relais/CarteRelais';
import {view} from 'react-easy-state';
import commandeStore from '../Store/commandeStore';
import client from '../Store/client';
import RechercheRelais from '../Admin/Relais/RechercheRelais';
import ChoisirRelais from '../Admin/Relais/ChoisirRelais';

class LivraisonRelais extends Component {
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
    return (<div className="flex_c">
      <div className="center"><RechercheRelais></RechercheRelais></div>
      <div className="relais_liste box_light4">
        <ChoisirRelais admin="admin"></ChoisirRelais>
      </div>
      <div className="flex_r w20 box_light3">
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

export default view(LivraisonRelais);
