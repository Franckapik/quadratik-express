import React, {Component} from 'react';
import CarteRelais from '../CarteRelais';
import RelaisList from '../RelaisList';
import {view} from 'react-easy-state';
import commandeStore from '../commandeStore';

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
      lat: 48.12076,
      long: -1.71134,
      showInfoRelais: false,
      relais_selected: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitRelais = this.submitRelais.bind(this);

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

      fetch('/saveInDB/livraison', {
        credentials: 'include',
        method: 'post',
        body: JSON.stringify(values),
        headers: new Headers({'Content-Type': 'application/json'})
      })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          console.log(res.error);
        } else {
          console.log(res.success);
          commandeStore.display = 'paiement';
          commandeStore.status = '80vw';
        }
      });

    }

  }

  getCotation() {
    fetch('/boxtal/cotation?transporteur=' + this.state.transporteur + '&poids=' + this.state.poids + '&longueur=' + this.state.longueur + '&largeur=' + this.state.largeur + '&hauteur=' + this.state.hauteur + '&code_postal=' + this.state.code_postal + '&ville=' + this.state.ville + '&adresse=' + this.state.adresse, {
      credentials: 'include',
      method: 'GET',
      mode: "cors" // no-cors, cors, *same-origin
    }).then(response => response.json()).then(data => {
      this.setState({cotation: data.cotation.shipment[0],
      service: data.cotation.shipment[0].offer[0].service[0].code[0] })
      console.log(data.cotation.shipment[0].offer[0].service[0].code[0]);
    });
  }

  render() {
    return (<div>

      <h2>Livraison en Point Relais</h2>
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

        <input type="submit" value="Rechercher" className="admin_form_button"/>
        <p>{this.state.poids}
          kg | L {this.state.longueur}
          cm x l {this.state.largeur}
          cm x h {this.state.hauteur}
          cm | Transporteur {this.state.transporteur}
        </p>
      </form>
      <div className="relais_container flex_r">
        <CarteRelais marker={[this.state.lat, this.state.long]} center={this.state.adresse + ' ' + this.state.code_postal + ' ' + this.state.ville}></CarteRelais>
        <div className="relais_liste">
          {
            this.state.cotation
              ? <ul key='cotation'>
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
                  </ul>

                  <li>
                    {
                      this.state.cotation.offer
                        ? this.state.cotation.offer.map((p, i) => {
                          return (<ul key={'cotation' + i}>
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
                            </li>
                            {
                              this.state.showInfoRelais
                                ? <ul key={'char' + i}>{
                                      p.characteristics[0].label.map((p, i) => {
                                        return (<li key={'label' + i}>{p}</li>)
                                      })
                                    }</ul>
                                : null
                            }
                            {
                              p.mandatory_informations[0].parameter[13]
                                ? <ul key={'par' + i}>
                                    {
                                      p.mandatory_informations[0].parameter[13].type[0].enum[0].value.map((p, i) => {
                                        return (<li key={'enum' + i}>
                                          <RelaisList code={p} setcoords={this.handleClick.bind(this)} selected={this.state.relais_selected}></RelaisList>
                                        </li>)
                                      })
                                    }</ul>
                                : null
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
            ? <form onSubmit={this.submitRelais} >
                <input type="submit" value="Choisir ce Relais" className="admin_form_button"/>
              </form>
            : "Aucun relais selectionné"
        }
      </div>

    </div>)
  }
}

export default view(AdminRelais);
