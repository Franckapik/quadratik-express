import React, {Component} from 'react';
import client from '../Store/client';

class SuiviSimple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suivi: null,
      reference: ""
    }
  }

  componentDidMount() {
    this.getReference(this.props.match.params.userid).then(ref => {
      this.getSuivi(ref);
    });
  }

  getReference(id) {
    return client.getReferenceFetch(id).then(ref => {
      this.setState({reference: ref})
      return ref.reference
    });
  }

  getSuivi(ref) {
    client.getSuiviFetch(ref).then(data => {
      this.setState({suivi: data.order})
      console.log(data);
    });
  }

  render() {

    const reference = this.state.reference.reference;
    const suivi = this.state.suivi;

    return (<div className="center">

      <h2>Mon Espace Client</h2>

      <h3>Suivi de mon colis</h3>

      {
        suivi
          ? <div className="flex_c flex_w box_light1">

            <h4 className="box_light3">Colis n° <strong>{this.state.reference.reference}</strong></h4>
            <ul className="table-left">
              <li className="table-header">
                <i className="fas fa-box-open givemespace"></i>Statut: {suivi.state[0]}</li>
              <li>
                <i className="fas fa-truck-moving givemespace"></i>{this.state.reference.service}
                 | Référence transporteur {suivi.carrier_reference[0]}</li>
              <li>
                <i className="fas fa-truck-loading givemespace"></i>
                  Dépot le {new Date(this.state.reference.collection_date).toLocaleString('fr-FR', { timeZone: 'UTC'})}</li>
                <li>
                  <i className="fas fa-people-carry givemespace"></i>Livraison estimée avant le {new Date(this.state.reference.livraison_date).toLocaleString('fr-FR', { timeZone: 'UTC'})} </li>
                </ul>
              </div>
              : 'aucun suivi disponible'
      }

    </div>)
  }
}

export default SuiviSimple;
