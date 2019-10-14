import React, {Component} from 'react';
import '../styles/App.scss';
import LivraisonAdresse from './LivraisonAdresse';
import LivraisonDomicile from './LivraisonDomicile';
import AdminRelais from '../Admin/AdminRelais';

import {view} from 'react-easy-state';

class Livraison extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "relais"
    };
  }

  handleOptionChange = changeEvent => {
    this.setState({selectedOption: changeEvent.target.value});
  };

  render() {
    return (<div>

      <div>

        <h1 className="center">Livraison</h1>
          <h3>Choisissez votre point de livraison</h3>
        <div className="flex_r givemespace">
          <div className="box_light2">
            <label>
              <input type="radio" name="react-tips" value="domicile" checked={this.state.selectedOption === "domicile"} className="form-check-input" onChange={this.handleOptionChange}/>
              A Domicile
            </label>
          </div>

          <div className="box_light2">
            <label>
              <input type="radio" name="react-tips" value="relais" checked={this.state.selectedOption === "relais"} className="form-check-input" onChange={this.handleOptionChange}/>
              En Point Relais
            </label>
          </div>

          <div className="box_light2">
            <label>
              <input type="radio" name="react-tips" value="nouvelleadresse" checked={this.state.selectedOption === "nouvelleadresse"} onChange={this.handleOptionChange}/>
              Nouvelle Adresse
            </label>
          </div>
        </div>
        {
          this.state.selectedOption === "nouvelleadresse"
            ? <LivraisonAdresse></LivraisonAdresse>
            : null
        }
        {
          this.state.selectedOption === "domicile"
            ? <LivraisonDomicile></LivraisonDomicile>
            : null
        }
        {
          this.state.selectedOption === "relais"
            ? <AdminRelais></AdminRelais>
            : null
        }
      </div>

    </div>)
  }
}

export default view(Livraison);
