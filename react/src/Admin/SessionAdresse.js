import React, {Component} from 'react';
import '../App.scss';
import client from '../Store/client';

class SessionAdresse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adresse: false
    };
  }

  componentDidMount() {
    client.adminUserFetch(this.props.sessid).then(adresse => {
      this.setState({adresse: adresse});
    });

  }

  render() {
    const a = this.state.adresse;
  return (
    <div className="client_column"> <h3>Adresse</h3>
{ a ?

            <ul>
              <li key={'Client_nom' }>
                {a.nom}
              </li>
            {a.prenom?  <li key={'Client_prenom' }>{a.prenom}</li> : null }
              <li key={'Client_adresse' }>{a.adresse}</li>
              <li key={'Client_ville' }>{a.postal + a.ville}</li>
              <li key={'Client_mail' }>{a.mail}</li>
              <li key={'Client_telephone' }>{a.telephone}</li>
            </ul>



  : null
} </div>

)
}
}


export default SessionAdresse;
