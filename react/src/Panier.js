import React, {Component} from 'react';
import './App.css';
import shopStore from './shopStore';
import Cart from './Cart';
import {view} from 'react-easy-state';
import Reduction from './Reduction';
import homeStore from './homeStore';

class Panier extends Component {

  render() {
    return (<div>
      <h1>Panier</h1>
      <div className="panier_container flex_r flex_w">
        <div className="flex_c">
          <Cart control="control" prices="prices" background="background"></Cart>
          <a href="/shop">
            <button >Retourner en Boutique</button>
          </a>
        </div>
        <div>
          <table className="cart_total flex_c">
            <tr>
              <th>Sous total</th>
              <td>{shopStore.somme}
                €</td>
            </tr>
            <tr>
              <th>Frais de ports</th>
              <td>{shopStore.fdp}
                €</td>
            </tr>
            {
              shopStore.reduction > 0
                ? <tr>
                    <th>Reduction</th>
                    <td>{shopStore.reduction}%</td>
                  </tr>
                : null
            }

            <tr>
              <th>Total (TTC)</th>
              <td>{shopStore.total}
                €</td>
            </tr>
            <tr>
              <th>Code de reduction</th>
              <td>
                <Reduction></Reduction>
              </td>
            </tr>

          </table>
          En cliquant sur "Commander", vous acceptez les <u className="cursor" onClick={() => {
              homeStore.width = '100%';
              homeStore.content = 'Cgv';
            }}>Conditions générales de ventes</u>
            <button className="boutique_header" onClick={()=> {shopStore.sendCartOnDB()}}>Commander</button>
        </div>

      </div>
      <p></p>
    </div>)
  }
}

export default view(Panier);
