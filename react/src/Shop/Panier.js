import React, {Component} from 'react';
import '../styles/App.scss';
import Cart from './Cart';
import {view} from 'react-easy-state';
import Reduction from './Reduction';
import homeStore from '../Store/homeStore';
import panier, {panierOperations} from '../Store/shopStore';

class Panier extends Component {

  componentDidMount() {
    panierOperations.getLocalCart();
  }

  render() {
    return (<div>
      <h1>Panier</h1>
      <div className="flex_r flex_w flex_baseline">
        <div className="flex_c w60 center">
          <Cart control="control" prices="prices"></Cart>
          <a href="/shop">
            <button className="button_light">Retourner en Boutique</button>
          </a>
        </div>
        <div className="box_light2 w25 center">
          <div className="table ">
            <ul className="flex_c">
              <li className="table-header">
                <div className="col w10">Sous total</div>
                <div className="col w25">Frais de ports</div>
                {
                  panier.reduction
                    ? <div className="col w25">Reduction</div>
                    : null
                }
                <div className="col w20">Total TTC</div>
              </li>
              <li className="table-row">
                <div className="col w10" data-label="Sous  total">{panier.montantHorsFdp}
                  €</div>
                <div className="col w25" data-label="Frais de ports">GRATUITS EN POINT RELAIS
                </div>
                {
                  panier.reduction
                    ? <div className="col w25">{panier.reduction}%</div>
                    : null
                }
                <div className="col w20" data-label="Total TTC">{panier.montantTotal}
                  €</div>

              </li>
              <li className="table-row">
                <div className="col w100 fullsize" data-label="reduction">
                  <Reduction></Reduction>
                </div>
              </li>
              <li> Nombre de colis estimé : {panier.nbColis}</li>
            </ul>
          </div>
          <p>En cliquant sur <strong>Commander</strong>, vous acceptez les             <u className="cursor" onClick={() => {
                homeStore.width = '100%';
                homeStore.content = 'Cgv';
              }}>Conditions générales de ventes</u>
          </p>
          <button className="boutique_header button_accent" onClick={() => {
              panierOperations.sendCartOnDB(0,1)
            }}>Commander</button>
        </div>

      </div>
      <p></p>
    </div>)
  }
}

export default view(Panier);
