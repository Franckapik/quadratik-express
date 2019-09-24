import React, {Component} from 'react';
import '../App.scss';
import client from '../Store/client';

class SessionLivraison extends Component {
  constructor(props) {
    super(props);
    this.state = {
      livraison: false
    };
  }

  componentDidMount() {
    client.adminLivraisonFetch(this.props.sessid)
    .then(livraison => {
      this.setState({livraison: livraison});
    });

  }

  render() {
    const a = this.state.livraison;
  return (
    <div className="client_column"> <h3>Livraison</h3>
{ a ?
            <ul>
              <li key={'Livraison_mode' }>
                {a.livr_mode}</li>
              <li key={'Livraison_nom' }>
                {a.livr_nom}</li>
              <li key={'Livraison_adresse' }>
                {a.livr_adresse}</li>
              <li key={'Livraison_ville' }>
                {a.livr_postal + a.livr_ville}</li>
            </ul>



 : null
} </div>

)
}
}


export default SessionLivraison;
