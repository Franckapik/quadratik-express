import React, {Component} from 'react';
import './App.css';
import LivraisonAdresse from './LivraisonAdresse';
import LivraisonDomicile from './LivraisonDomicile';
import LivraisonRelais from './LivraisonRelais';

import {view} from 'react-easy-state';

class Livraison extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "relais"
    };
  }

  handleOptionChange = changeEvent => {
    console.log(changeEvent.target.value);
    this.setState({selectedOption: changeEvent.target.value});
  };

  render() {
    return (<div>

      <div>
        <h1 className="center">Livraison</h1>

        <div className="flex_r">
          <div className="form-check">
            <label>
              <input type="radio" name="react-tips" value="domicile" checked={this.state.selectedOption === "domicile"} className="form-check-input" onChange={this.handleOptionChange}/>
              Livraison à Domicile
            </label>
          </div>

        <div className="form-check">
            <label>
              <input type="radio" name="react-tips" value="relais" checked={this.state.selectedOption === "relais"} className="form-check-input" onChange={this.handleOptionChange}/>
              Livraison en point relais
            </label>
          </div>

          <div className="form-check">
            <label>
              <input type="radio" name="react-tips" value="nouvelleadresse" className="form-check-input" checked={this.state.selectedOption === "nouvelleadresse"} onChange={this.handleOptionChange}/>
              Livraison à une autre adresse
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
            ? <LivraisonRelais></LivraisonRelais>
            : null
        }
      </div>

    </div>)
  }
}

export default view(Livraison);
