import React, {Component} from 'react';
import '../styles/App.scss';
import {view} from 'react-easy-state';
import MollieComp from './MollieComp';
import client from '../Store/client';

class Paiement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "cb",
      info: 'null',
    };

    this.submit = this.submit.bind(this);
  }

  handleOptionChange = changeEvent => {
    this.setState({selectedOption: changeEvent.target.value});
  };

  componentDidMount() {
    client.adminFetch()
    .then(adminData => {
      console.log(adminData);
      this.setState({
        info: adminData.infos[0],
      });
    });
  }

  submit(e) {
    client.virement()
    .then(res => {
        if (res.payment.status === 'open') {
          window.location = res.redirect;
        } else {
          window.location = '/500';
        }
  })
  }

  render() {
    return (<div className="flex_c fullsize center">
      <div className="flex_r givemespace center">
        <div className="box_dark2">
          <label>
            <input type="radio" name="react-tips" value="cb" checked={this.state.selectedOption === "cb"} onChange={this.handleOptionChange}/>
            Carte Bleue
          </label>
        </div>

        <div className="box_dark2">
          <label>
            <input type="radio" name="react-tips" value="virement" checked={this.state.selectedOption === "virement"} onChange={this.handleOptionChange}/>
            Virement bancaire
          </label>
        </div>
      </div>
{this.state.cart ?
  <div className="box_light4">
  <div>Montant de la commande : {this.state.cart.montanthorsfdp} €</div>
  <div>Frais de ports : {this.state.cart.fdp} €</div>
  <div>Total de la transaction : {this.state.cart.montanttotal} €</div>
  </div>
 :null }
      {
        this.state.selectedOption === "cb"
          ? <div>
              <h3>Paiement par Carte Bleue</h3>
              <MollieComp></MollieComp>
            </div>
          : <div>
              <h3>Virement Bancaire</h3>

            Vous pouvez réaliser un virement bancaire sur le compte suivant :

              <p> Titulaire du compte : {this.state.info.titulaire}</p>

              <p>IBAN : {this.state.info.iban}</p>

              <p>BIC : {this.state.info.bic}</p>

            Nous engagerons la commande dès reception du virement. Un mail vous sera envoyé afin de vous confirmer le paiement et l'engagement de la commande.

            <button onClick={this.submit}> Je choisis le virement bancaire</button>
            </div>

      }</div>)
  }
}

export default view(Paiement);
