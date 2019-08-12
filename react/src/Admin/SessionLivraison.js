import React, {Component} from 'react';
import '../App.scss';

class SessionLivraison extends Component {
  constructor(props) {
    super(props);
    this.state = {
      livraison: false
    };
  }

  componentDidMount() {
    fetch('/getFromDB/adminLivraison?sessid=' + this.props.sessid).then(response => response.json()).then(livraison => {
      this.setState({livraison: livraison});
    });

  }

  render() {
  return (
    <div className="client_column"> <h3>Livraison</h3>
{ this.state.livraison ? this.state.livraison.map((p, i) => {
        return (
          <div key={i}>
            <ul>
              <li key={'Livraison_mode' + i}>
                {p.livr_mode}</li>
              <li key={'Livraison_nom' + i}>
                {p.livr_nom}</li>
              <li key={'Livraison_adresse' + i}>
                {p.livr_adresse}</li>
              <li key={'Livraison_ville' + i}>
                {p.livr_postal + p.livr_ville}</li>
            </ul>

          </div>
        )

  }) : null
} </div>

)
}
}


export default SessionLivraison;
