import React, {Component} from 'react';
import shopStore from '../Store/shopStore';
import Cart from './Cart';
import {view} from 'react-easy-state';

class CartWidget extends Component {
  componentDidMount() {
    shopStore.getSessionCart();
  }

  getPanier() {
    shopStore.showCart = true;
    shopStore.showWidget = false;
  }

  render() {
    let sidewidth = {height : shopStore.height}

    return (<div>
      {
        shopStore.showWidget
          ? <div className="cart_widget_container">
              {
                shopStore.cart.length !== 0
                  ? <div>
                      <Cart control="control"></Cart>
                    <span> Total (sans frais de ports) : <strong>{shopStore.somme} € TTC</strong></span>
<p></p>
                      <button className="button_blue" onClick={this.getPanier}>
                        Voir le Panier
                      </button>
                    </div>
                  : <span className="center">Panier vide</span>
              }
            </div>

          : null
      }
      <div className="addCart_display" style={sidewidth}>
        {shopStore.cart.length !== 0 ? <span className="addCart_title">{shopStore.cart[shopStore.cart.length-1].produit.nom}</span> : 'vide'}
        <button className="boutique_header" onClick={this.getPanier}>
           Voir le Panier
        </button>
        <p></p>
      </div>

    </div>)

  }
}

export default view(CartWidget);
