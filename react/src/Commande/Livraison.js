import React, {Component} from 'react';
import '../styles/App.scss';
import commandeStore from '../Store/commandeStore';
import client from '../Store/client';
import {livraisonDomicileSchema} from '../forms';
import Form from "react-jsonschema-form";
import {view} from 'react-easy-state';
import RechercheRelais from '../Admin/Relais/RechercheRelais';
import ChoisirRelais from '../Admin/Relais/ChoisirRelais';

const log = (type) => console.log.bind(console, type);

class Livraison extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "relais"
    };
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    client.userFetch().then(user => {
      
      this.formData = {
        mode: "domicile",
        firstName: user.nom + " " + user.prenom,
        adresse: user.adresse,
        ville: user.ville,
        codepostal: user.postal,
        pays: user.pays
      };
      this.forceUpdate();
    });
  }

  submit({
    formData
  }, e) {
    client.livraisonPost(formData).then(res => {
      if (res.ok) {
        if (!window.location.href.includes('admin')) {
          commandeStore.display = 'paiement';
          commandeStore.status = '80vw';
        } else {
          commandeStore.admindisplay = 'paiement'
        }
      } else {
        window.location = '/500';
      }

    });
  };

  saveRelais(event) {
    const r = commandeStore.relais_selected
    

    if (r.code[0]) {
      const values = {
        mode: r.code[0],
        operateur: r.code[0].substring(0, 4),
        service: "Relais Colis",
        firstName: r.name[0],
        adresse: r.address[0],
        ville: r.city[0],
        codepostal: r.zipcode[0]
      }

      client.livraisonPost(values).then(res => {
        if (res.ok) {
          if (!window.location.href.includes('admin')) {
            commandeStore.display = 'paiement';
            commandeStore.status = '80vw';
          } else {
            commandeStore.admindisplay = 'paiement';
          }
        } else {
          window.location = '/500';
        }

      });
    }
    event.preventDefault();
  }

  handleOptionChange = changeEvent => {
    this.setState({selectedOption: changeEvent.target.value});
  };

  render() {
    return (<div className="flex_c fullsize">
      <div className="flex_r givemespace center">
        <div className="box_dark2">
          <label>
            <input type="radio" name="react-tips" value="domicile" checked={this.state.selectedOption === "domicile"} onChange={this.handleOptionChange}/>
            Domicile
          </label>
        </div>

        <div className="box_dark2">
          <label>
            <input type="radio" name="react-tips" value="relais" checked={this.state.selectedOption === "relais"} onChange={this.handleOptionChange}/>
            En Point Relais
          </label>
        </div>
      </div>
      {
        this.state.selectedOption === "domicile"
          ? <div>
              <h3>Livraison à domicile / Nouvelle adresse</h3>
              <Form schema={livraisonDomicileSchema.schema} uiSchema={livraisonDomicileSchema.uiSchema} formData={this.formData} onSubmit={this.submit} onChange={log(this.formData)}/>
            </div>
          : null
      }
      {
        this.state.selectedOption === "relais"
          ? <div className="flex_r width80">
              <div className="center">
                <h3>Livraison en Point relais</h3>

                <RechercheRelais></RechercheRelais>
              </div>
              <div className="flex_c w50">
                <div className="relais_liste box_light4">
                  <ChoisirRelais admin="admin"></ChoisirRelais>
                </div>
                <div className="box_light2">
                  {
                    commandeStore.relais_selected
                      ? <div>
                          <p>{commandeStore.relais_selected.name[0]}</p>
                          <form onSubmit={(event) => {
                              this.saveRelais(event)
                            }}>
                            <input type="submit" value="Choisir ce Relais"/>
                          </form>
                        </div>
                      : <p>Choisissez un relais dans la liste</p>
                  }
                </div>
              </div>
            </div>
          : null
      }

    </div>)
  }
}

export default view(Livraison);
