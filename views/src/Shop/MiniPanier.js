import React, {Component} from 'react';
import panier, {panierOperations} from '../Store/shopStore';
import Cart from './Cart';
import {view} from 'react-easy-state';

function Encart(props) {
  return (
    <div className="addCart_display box_light4 center" style={{height : props.height, visibility: props.visibility}}>
    <i className="fas fa-cart-plus givemelittlespace"></i> {panierOperations.infos.length && panier.listeProduits.length ? <span className="addCart_title">{panierOperations.getProductInfo(panier.listeProduits[panier.listeProduits.length -1].id).nom}</span> : null}
        <p>
        <a href="/panier">
          <button className="button_light">
            Voir le Panier
          </button>
        </a>
      </p>
    </div>
  )
}

class MiniPanier extends Component {
  componentDidMount() {
    panierOperations.getLocalCart();
  }

  render() {
    return (<div>
      { panierOperations.showMiniPanier ?
        <div className="minipanier_container box_light4 center flex_c">
            <div className='close cursor' onClick={() => {
                panierOperations.showMiniPanier = !panierOperations.showMiniPanier
              }}>
              <i className="fas fa-times"></i>
            </div>
            <p className="givemelittlespace">
              <h3>Panier ({panier.qteTotale}
                article{
                  panier.qteTotale > 1
                    ? 's'
                    : null
                })</h3>
            </p>
            {
              panier.listeProduits.length !== 0
                ? <div>
                <a href="/panier">
                  <button className="button_accent fullsize givemespace">
                    Passer la commande
                  </button>
                </a>
                    <Cart control="control"></Cart>
                    <span>
                      Total :
                      <strong>{panier.montantHorsFdp}
                        € TTC</strong>
                    </span>
                    <p></p>
                    <a href="/panier">
                      <button className="button_accent fullsize givemespace">
                        Passer la commande
                      </button>
                    </a>
                    <button className="button_light fullsize givemespace" onClick={() => {
                        panierOperations.showMiniPanier = !panierOperations.showMiniPanier
                      }}>
                      Continuer mes achats
                    </button>
                  </div>
                : <span className="center">Panier vide</span>
            }
          </div> : null

      }

      <Encart visibility={panierOperations.notification[1]} height={panierOperations.notification[0]}></Encart>

    </div>)

  }
}

export default view(MiniPanier);
