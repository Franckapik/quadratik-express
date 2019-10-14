import React, {Component} from 'react';
import CarteRelais from '../Commande/CarteRelais';
import RelaisList from '../Commande/RelaisList';
import {view} from 'react-easy-state';
import commandeStore from '../Store/commandeStore';
import client from '../Store/client';


class AdminRelais extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cotation: null,
      transporteur: "SOGP",
      service: "RelaisColis",
      poids: 5.0,
      longueur: 50,
      largeur: 50,
      hauteur: 55,
      code_postal: 35000,
      ville: "Rennes",
      adresse: "boulevard magenta",
      lat: 0,
      long: 0,
      showInfoRelais: false,
      relais_selected: '',
      sessid:'',
      wrongAdresse: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdresse = this.handleAdresse.bind(this);
    this.submitRelais = this.submitRelais.bind(this);

  }

  componentDidMount() {
    if (!this.props.admin) {
      this.initialAdress()
      .then(user => {
        this.getCotation();
      });
    }
  }

  initialAdress() {
    return client.userFetch().then(user => {
      if (user.length === 0) {
        this.setState({
          wrongAdresse : true
        })
      }
      this.setState({adresse: user.adresse, code_postal: user.postal, ville: user.ville})
      return user
    });
  }

  getAdresse(id) {
    client.adminUserFetch(id).then(user => {
      this.setState({adresse: user.adresse, code_postal: user.postal, ville: user.ville});
    });
  }

  handleClick(lat, long, relais) {
    this.setState({lat: lat, long: long, relais_selected: relais})
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = event.target.name;

    this.setState({[name]: value});

  }

  handleSubmit(event) {
    this.getCotation();
    event.preventDefault();
  }

  handleAdresse(event) {
    this.getAdresse(this.state.sessid);
    event.preventDefault();
  }

  submitRelais(event) {
    this.saveRelais();
    event.preventDefault();
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

      client.livraisonPost(values)
      .then(res => {
        if(res.ok) {
          commandeStore.display = 'paiement';
          commandeStore.status = '80vw';
        } else {
          window.location ='/500' ;
        }

      });

    }

  }

  getCotation() {
    client.cotationFetch(this.state)
    .then(data => {
      console.log('ici', data);
      if(data.error) {
        this.setState({
          wrongAdresse : true
        })
        console.log(data.error.message[0]);
      }
      this.setState({cotation: data.cotation.shipment[0], service: data.cotation.shipment[0].offer[0].service[0].code[0]})
    });
  }

  render() {
    return (<div>

{this.state.wrongAdresse ?
  <form onSubmit={this.handleSubmit} className="center">
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
  : null}

      {
        this.props.admin
          ? <>
          <form onSubmit={this.handleAdresse} className="admin_form_relais">
              <label>Session Id :
                <input name="sessid" value={this.state.sessid} onChange={this.handleChange} style={{
                    width: "10em"
                  }}/>
              </label>
              <input type="submit" value="Trouver" className="admin_form_button"/>
            </form>


          <form onSubmit={this.handleSubmit} className="admin_form_relais">
              <label>Poids (kg):
                <input name="poids" value={this.state.poids} onChange={this.handleChange} style={{
                    width: "2em"
                  }}/>
              </label>
              <label>Longueur (cm):
                <input maxLength="5" name="longueur" value={this.state.longueur} onChange={this.handleChange} style={{
                    width: "2em"
                  }}/>
              </label>
              <label>Largeur (cm):
                <input name="largeur" value={this.state.largeur} onChange={this.handleChange} style={{
                    width: "2em"
                  }}/>
              </label>
              <label>Hauteur (cm):
                <input name="hauteur" value={this.state.hauteur} onChange={this.handleChange} style={{
                    width: "2em"
                  }}/>
              </label>
              <br></br>
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
              <label>
                Transporteur:
                <select name="transporteur" onChange={this.handleChange}>
                  <option value="SOGP">Relais Colis</option>
                  <option value="MONR">Mondial relais</option>
                  <option value="UPSE">UPS</option>
                  <option value="CHRP">Chronopost</option>
                  <option value="POFR">La Poste</option>
                </select>
              </label>
<br></br>
              <input type="submit" value="Rechercher" className="admin_form_button"/>
              <p>{this.state.poids}
                kg | L {this.state.longueur}
                cm x l {this.state.largeur}
                cm x h {this.state.hauteur}
                cm | Transporteur {this.state.transporteur}
              </p>
            </form> </>
          : null
      }

      <div className="relais_container flex_r">
        <CarteRelais marker={[this.state.lat, this.state.long]} center={this.state.adresse + ' ' + this.state.code_postal + ' ' + this.state.ville} admin={this.props.admin}></CarteRelais>
        <div className="relais_liste">
          {
            this.state.cotation
              ? <ul key='cotation'> {
                this.state.admin?
                    <ul key='package' className="flex_r package">
                      <li>
                        {this.state.cotation.package[0].weight[0]}
                        Kg
                      </li>
                      <li>{this.state.cotation.package[0].length[0]}
                        cm (L) x
                      </li>
                      <li>{this.state.cotation.package[0].width[0]}
                        cm (l) x
                      </li>
                      <li>{this.state.cotation.package[0].height[0]}
                        cm (h)
                      </li>
                      <li>
                        {this.state.cotation.recipient[0].zipcode[0]}
                        &nbsp; {this.state.cotation.recipient[0].city[0]}
                      </li>
                    </ul> : null
              }

                  <li>
                    {
                      this.state.cotation.offer
                        ? this.state.cotation.offer.map((p, i) => {
                          return (<ul key={'cotation' + i}>
                          {this.state.admin? <>
                            <li key={'op' + i} className="center">{p.operator[0].label[0]}</li>
                            <li key={'price' + i}>{p.price[0]["tax-exclusive"]}
                              €
                            </li>
                            <li key={'col' + i}>Dépot : {p.collection[0].date}</li>
                            <li key={'del' + i}>Livraison : {p.delivery[0].date}</li>
                            <li key={'info' + i} onClick={() => {
                                this.setState({
                                  showInfoRelais: !this.state.showInfoRelais
                                })
                              }}>
                              Informations supplémentaires
                            </li></> : null}
                            {
                              this.state.showInfoRelais
                                ? <ul key={'char' + i} >{
                                      p.characteristics[0].label.map((p, i) => {
                                        return (<li key={'label' + i}>{p}</li>)
                                      })
                                    }</ul>
                                : null
                            }
                            {
                              p.mandatory_informations[0].parameter[13].type[0].enum[0].value
                                ? <ul key={'par' + i}>
                                    {
                                      p.mandatory_informations[0].parameter[13].type[0].enum[0].value.map((p, i) => {
                                        return (<li key={'enum' + i} className="center">
                                          <RelaisList code={p} setcoords={this.handleClick.bind(this)} selected={this.state.relais_selected}></RelaisList>
                                        </li>)
                                      })
                                    }</ul>
                                  : 'Aucun relais trouvé'
                            }
                          </ul>)
                        })
                        : "Aucune offre n'est disponible"
                    }</li>
                </ul>
              : null
          }
        </div>

      </div>

      <div className="center">
        {
          this.state.relais_selected
            ? <>{!this.props.admin? <form onSubmit={this.submitRelais}>
              <input type="submit" value="Choisir ce Relais" className="admin_form_button"/>
              </form> : null}</>
            : <p>Choisissez un relais dans la liste</p>
        }
      </div>

    </div>)
  }
}

export default view(AdminRelais);
