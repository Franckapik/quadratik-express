import React, {Component} from 'react';
import '../styles/App.scss';
import shopStore from '../Store/shopStore';
import Cart from './Cart';
import {view} from 'react-easy-state';
import Reduction from './Reduction';
import homeStore from '../Store/homeStore';

class Panier extends Component {

  render() {
    return (<div>
      <h1>Panier</h1>
      <div className="flex_r flex_w flex_baseline">
        <div className="flex_c w70 center">
          <Cart control="control" prices="prices"></Cart>
          <p>En cliquant sur <strong>Commander</strong>, vous acceptez les <u className="cursor" onClick={() => { homeStore.width = '100%'; homeStore.content = 'Cgv'; }}>Conditions générales de ventes</u></p>
          <a href="/shop">
            <button className="button_light">Retourner en Boutique</button>
          </a>
        </div>
        <div className="box_light3 w25 center">
          <div className="table ">
            <ul className="flex_c">
              <li className="table-header">
                <div className="col w10">Sous total</div>
                <div className="col w25">Frais de ports</div>
                {
                  shopStore.reduction > 0
                    ? <div className="col w25">Reduction</div>
                    : null
                }
                <div className="col w20">Total TTC</div>
              </li>
              <li className="table-row">
                <div className="col w10" data-label="Sous  total">{shopStore.somme}</div>
                <div className="col w25" data-label="Frais de ports">{shopStore.fdp}
                  €</div>
                {
                  shopStore.reduction > 0
                    ? <div className="col w25">{shopStore.reduction}%</div>
                    : null
                }
                <div className="col w20" data-label="Total TTC">{shopStore.total}
                  €</div>

              </li>
              <li>                <div className="col w20" data-label="Total TTC">
                                <Reduction></Reduction>
                              </div></li>
            </ul>
          </div>

          <button className="boutique_header" onClick={() => {
              shopStore.sendCartOnDB()
            }}>Commander</button>
        </div>

      </div>
      <p></p>
    </div>)
  }
}

export default view(Panier);
