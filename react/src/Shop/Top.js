import React, { Component } from 'react';
import '../styles/App.scss';
import Produit from './Produit'

class Top extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection : null
    };
  }

  produitSelected(nom){
    this.setState(
      {
        selection: nom
      }
    );
  }

  render() {
    return (
      <div>
        <div className=" flex_r flex_w" >
          <p className="collection_title ">Top 4 des Ventes</p>
        {this.props.collectionid ? this.props.collectionid.map((produit, i) => {
          return (
            <Produit
              key={i}
              name={produit.name}
              nom={produit.nom}
              src={produit.src}
              srcImg={'images/modeles/'+produit.name+'/'+produit.src+'.png'}
              prix={produit.prix}
              frequence={produit.frequence}
              classement={produit.classement}
              nbColors={produit.nbColors}
              nbcellules={produit.nbcellules}
              largeur={produit.largeur}
              longueur={produit.longueur}
              prof={produit.prof}
              packaging={produit.packaging}
              desccollection={produit.desc_collection}
              descproduct={produit.desc_product}
              onClick={this.produitSelected.bind(this)}
              details={this.state.selection === produit.nom}
              color = 'blue'
              unite={produit.unite}
              poids={produit.poids}
              />
          );

        }) : console.log('pas de collections encore')}
      </div></div>

    )

  }
}

export default Top;
