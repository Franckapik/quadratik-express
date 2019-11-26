import React, {Component} from 'react';
import client from '../../Store/client';
import {view} from 'react-easy-state';
import commandeStore from '../../Store/commandeStore';

class RechercheRelais extends Component {

  constructor(props) {
    super(props);
    this.state = {
      transporteur: "SOGP",
      service: "RelaisColis",
      poids: 5.0,
      longueur: 50,
      largeur: 50,
      hauteur: 55,
      code_postal: 35000,
      ville: "Rennes",
      adresse: "boulevard magenta",
      sessid: '',
      wrongAdresse: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitAdresse = this.handleSubmitAdresse.bind(this);
    this.handleSubmitSessid = this.handleSubmitSessid.bind(this);

  }

  componentDidMount() {
    if (!this.props.admin) {
      this.initialAdress().then(user => {
        this.getCotation();
      });
    }
  }

  getCotation() {
    client.cotationFetch(this.state)
    .then(data => {
      if(data.error) {
        commandeStore.cotation = false;
      } else {
        commandeStore.cotation = data.cotation.shipment[0];
        commandeStore.service = data.cotation.shipment[0].offer[0].service[0].code[0];
      }
    });
  }

  initialAdress() {
    return client.userFetch().then(user => {
      if (user.length === 0) {
        commandeStore.cotation = false;
      }
      this.setState({adresse: user.adresse, code_postal: user.postal, ville: user.ville})
      return user
    });
  }

  handleSubmitSessid(event) {
  client.adminUserFetch(this.state.sessid)
      .then(user => {
        this.setState({adresse: user.adresse, code_postal: user.postal, ville: user.ville});
      });
    event.preventDefault();
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = event.target.name;

    this.setState({[name]: value});
  }

  handleSubmitAdresse(event) {
    this.getCotation();
    event.preventDefault();
  }

  render() {
    return (<div>
      {
        this.props.admin
          ? <div>
          <h3>Rechercher un relais</h3>
          <form onSubmit={this.handleSubmitSessid} className="box_light2 givemespace">
              <label>Session Id
                <input name="sessid" value={this.state.sessid} onChange={this.handleChange} style={{
                    width: "10em"
                  }}/>
              </label>
              <input type="submit" value="Rechercher via session"/>
            </form>

            <form onSubmit={this.handleSubmitAdresse} className="box_light2 givemespace">
              <p>
              <label>Poids (kg)
                <input name="poids" value={this.state.poids} onChange={this.handleChange} style={{
                    width: "2em"
                  }}/>
              </label>
              <label>L (cm)
                <input maxLength="5" name="longueur" value={this.state.longueur} onChange={this.handleChange} style={{
                    width: "2em"
                  }}/>
              </label>
              <label>l (cm)
                <input name="largeur" value={this.state.largeur} onChange={this.handleChange} style={{
                    width: "2em"
                  }}/>
              </label>
              <label>H (cm)
                <input name="hauteur" value={this.state.hauteur} onChange={this.handleChange} style={{
                    width: "2em"
                  }}/>
              </label>
              </p>
              <p>
                <hr></hr>
              <label>Adresse
                <input name="adresse" value={this.state.adresse} onChange={this.handleChange} style={{
                    width: "200px"
                  }}/>
              </label></p>
            <p>
              <label>Code Postal
                <input name="code_postal" value={this.state.code_postal} onChange={this.handleChange} style={{
                    width: "50px"
                  }}/>
              </label>
              <label>Ville
                <input name="ville" value={this.state.ville} onChange={this.handleChange} style={{
                    width: "100px"
                  }}/>
              </label></p>
            <p>
              <label>
                Transporteur
                <select name="transporteur" onChange={this.handleChange}>
                  <option value="SOGP">Relais Colis</option>
                  <option value="MONR">Mondial relais</option>
                  <option value="UPSE">UPS</option>
                  <option value="CHRP">Chronopost</option>
                  <option value="POFR">La Poste</option>
                </select>
              </label></p>
              <input type="submit" value="Rechercher via adresse"/>
            </form></div>
          : null
      }

      {!commandeStore.cotation ?
      <form onSubmit={this.handleSubmitAdresse} className="center">
      <p>Votre adresse postale n'a pas été retrouvée. Pourriez-vous la redéfinir ? </p>
      <label>Adresse:
        <input name="adresse" value={this.state.adresse} onChange={this.handleChange} style={{
            width: "200px"
          }}/>
      </label>
      <label>Code Postal:
        <input name="code_postal" value={this.state.code_postal} onChange={this.handleChange} style={{
            width: "50px"
          }}/>
      </label>
      <label>Ville:
        <input name="ville" value={this.state.ville} onChange={this.handleChange} style={{
            width: "100px"
          }}/>
      </label>
      <button type="submit">Rechercher</button>
      </form>
      : "Veuillez selectionner un point relais dans la liste" }
    </div>)
  }
}

export default view(RechercheRelais);
