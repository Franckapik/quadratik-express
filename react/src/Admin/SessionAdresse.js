import React, {Component} from 'react';
import '../App.scss';

class SessionAdresse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adresse: false
    };
  }

  componentDidMount() {
    fetch('/getFromDB/adminAdresse?sessid=' + this.props.sessid).then(response => response.json()).then(adresse => {
      this.setState({adresse: adresse});
    });

  }

  render() {
  return (
    <div className="client_column"> <h3>Adresse</h3>
{ this.state.adresse ? this.state.adresse.map((p, i) => {
        return (
          <div key={i}>
            <ul>
              <li key={'Client_nom' + i}>
                {p.nom}
              </li>
            {p.prenom?  <li key={'Client_prenom' + i}>{p.prenom}</li> : null }
              <li key={'Client_adresse' + i}>{p.adresse}</li>
              <li key={'Client_ville' + i}>{p.postal + p.ville}</li>
              <li key={'Client_mail' + i}>{p.mail}</li>
              <li key={'Client_telephone' + i}>{p.telephone}</li>
            </ul>

          </div>
        )

  }) : null
} </div>

)
}
}


export default SessionAdresse;
