import React, {Component} from 'react';
import panier, {panierOperations} from '../Store/shopStore';
import {view} from 'react-easy-state';

class Cart extends Component {
  componentDidMount() {
    panierOperations.getLocalCart();
  }

  render() {
    return (<div className="cart center fullsize">
      <div className="table ">
        <ul>
          <li className="table-header">
            <div className="col w40">Nom</div>
            <div className="col w20">Quantité</div>
            {
              this.props.prices
                ? <> < div className = "col w10" > Articles</div> < div className = "col w20" > Sous - total</div></>
                : null
            }
            {
              this.props.control
                ? <div className="col w40">Ajuster</div>
                : null
            }
          </li>
          { panierOperations.infos.length?
       panier.listeProduits.map((p, i) => {
         return <>
         <li className="table-row">

           <div className="col w40" data-label="Nom">
          <a href={'/produit'+panierOperations.getProductInfo(p.id).src}><img className="produit_img cursor" src={'images/modeles/'+panierOperations.getProductInfo(p.id).folder+'/'+panierOperations.getProductInfo(p.id).src+'.png'} alt='Affichage non disponible'/></a>
             <p>{p.nom}</p></div>
           <div className="col w20" data-label="Quantité">{p.qte}</div>
           {
             this.props.prices
               ? <><div className="col w10" data-label="Articles">{p.prix}
                   €</div>
                 <div className="col w20" data-label="Sous-total">{p.prix * p.qte}
                   € TTC</div></>
               : null
           }
           {
             this.props.control
               ? <div className="col w40" data-label="Ajuster">
                   <i className="fas fa-plus cursor givemelittlespace" onClick={() => panierOperations.addToCart(p.id, 1)}></i>
                   <i className='fas fa-minus cursor givemelittlespace' onClick={() => panierOperations.removeFromCart(p.id, 1)}></i>
                   <i className="fas fa-times cursor givemelittlespace" onClick={() => panierOperations.deleteFromCart(p.id)}></i>
                 </div>
               : null
           }
         </li></>

     }) : "Chargement des articles"
 }
        </ul>
      </div>

    </div>)

  }

}

export default view(Cart);
