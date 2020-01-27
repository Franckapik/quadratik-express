import React, {Component} from 'react';
import '../styles/App.scss';
import Enregistrement from '../Commande/Enregistrement';
import Livraison from '../Commande/Livraison';
import Paiement from '../Commande/Paiement';
import PanierForm from './PanierForm';
import AddProduct from './AddProduct';
import commandeStore from '../Store/commandeStore';
import {view} from 'react-easy-state';


class Devis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterLast: 1,
      etiquette_id: null,
      sidewidth: {
        width: 0
      },
    }
  }

  render() {
    return (<div>
      <h2>Devis et Facturation</h2>

<h3>> {commandeStore.admindisplay}</h3> 
<div> {
            commandeStore.admindisplay === 'enregistrement'
              ? <Enregistrement></Enregistrement>
              : null
          } {
            commandeStore.admindisplay === 'livraison'
              ? <Livraison></Livraison>
              : null
          }
          {
            commandeStore.admindisplay === 'panier'
              ? <AddProduct produits= {this.props.produits}></AddProduct>
              : null
          }{
            commandeStore.admindisplay === 'paiement'
              ? <Paiement></Paiement>
              : null
          } </div>


    </div>)
  }
}

export default view(Devis);
