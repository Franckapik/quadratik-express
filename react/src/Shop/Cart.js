import React, {Component} from 'react';
import shopStore from '../Store/shopStore';
import {view} from 'react-easy-state';

class Cart extends Component {

  render() {
    return (<div className="cart box_light1 center fullsize">
    <div className="table ">
  <ul>
    <li className="table-header">
      <div className="col w10">Diffuseur</div>
      <div className="col w25">Nom</div>
      <div className="col w20">Quantité</div>
        {
          this.props.prices
            ?<><div className="col w10">Articles</div>
      <div className="col w20">Frais de ports</div>
      <div className="col w20">Sous-total</div></>:null}
        {
          this.props.control
            ? <div className="col w40">Ajuster</div>: null
        }
    </li>
      {
        shopStore.cart.map((p, i) => {
          return <>
          <li className="table-row">
            <div className="col w10" data-label="Diffuseur"><img src={p.produit.srcImg} alt='Aperçu du produit'/></div>
            <div className="col w25" data-label="Nom">{p.produit.nom}</div>
            <div className="col w20" data-label="Quantité">{p.qte}</div>
            {
              this.props.prices
                ? <><div className="col w10" data-label="Articles">{p.produit.prix}
                    €</div>
                  <div className="col w20" data-label="Frais de ports">{p.produit.packaging}
                    €</div>
                  <div className="col w20" data-label="Sous-total">{(p.produit.prix + p.produit.packaging) * p.qte}
                    € TTC</div></>
                : null
            }
            {
              this.props.control
                ? <div className="col w40" data-label="Ajuster">
                    <i className="fas fa-plus cursor givemespace" onClick={shopStore.plusCart.bind(p.produit.nom)}></i>
                    <i className='fas fa-minus cursor givemespace' onClick={shopStore.lessCart.bind(p.produit.nom)}></i>
                    <i className="fas fa-times cursor givemespace" onClick={shopStore.removeFromCart.bind(p.produit.nom)}></i>
                  </div>
                : null
            }
          </li></>

    })
  }
</ul>
</div>


    </div>)

  }

}

export default view(Cart);
