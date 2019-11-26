import React, {Component} from 'react';
import '../styles/App.scss';
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
    this.setState({selectedOption: changeEvent.target.value});
  };

  render() {
    return (<div className="flex_c fullsize">
        <div className="flex_r givemespace center">
          <div className="box_dark2">
            <label>
              <input type="radio" name="react-tips" value="domicile" checked={this.state.selectedOption === "domicile"}  onChange={this.handleOptionChange}/>
              A Domicile
            </label>
          </div>

          <div className="box_dark2">
            <label>
              <input type="radio" name="react-tips" value="relais" checked={this.state.selectedOption === "relais"}  onChange={this.handleOptionChange}/>
              En Point Relais
            </label>
          </div>

          <div className="box_dark2">
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
            ? <LivraisonRelais></LivraisonRelais>
            : null
        }


    </div>)
  }
}

export default view(Livraison);
