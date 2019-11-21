import React, {Component} from 'react';
import client from '../Store/client';

class Suivi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suivi: null,
      message: null,
      sidewidth: {
        width: 0
      }
    }
  }

  componentDidMount() {
    this.getReference(this.props.id);
  }

  changeWidth(size) {
    this.setState({
      sidewidth: {
        width: size
      }
    })
  }

  getReference(id) {
    client.getReferenceFetch(id).then(data => {
      this.setState({
        reference: data,
      })
    });
  }

  getSuivi(ref) {
    client.getSuiviFetch(ref).then(data => {
      this.setState({
        suivi: data,
        sidewidth: {
          width: 500
        }
      })
    });
  }

  render() {
    const s = this.state.suivi;
    return (<div>
      <i className="fas fa-truck cursor" onClick={() => {
          this.getSuivi(this.state.reference.reference);
        }}>
        Suivi Colis</i>
      {
        this.state.reference ? <p>{this.state.reference.reference}</p> : null
      }
      <div className="flex_r flex_w " style={this.state.sidewidth}>
        <div className='slide_close cursor' onClick={() => this.changeWidth(0)}>
          <i className="fas fa-times"></i>
          Fermer
        </div>
        {
          s
            ? <ul>
                <li>{s.order.emc_reference[0]}</li>
                <li>{s.order.state[0]}</li>
                <li>{s.order.carrier_reference[0]}</li>
                <li><a href={s.order.label_url[0]}>bordereau</a></li>
                <li>collection: {this.state.reference.collection_date}</li>
                <li>livraison: {this.state.reference.livraison_date}</li>
                <li>{this.state.reference.service}</li>
                <li>{new Date(Number(this.state.reference.date_commande)).toLocaleString()}</li>
              </ul>
            : 'aucun suivi disponible'
        }
      </div>
    </div>)
  }
}

export default Suivi;
