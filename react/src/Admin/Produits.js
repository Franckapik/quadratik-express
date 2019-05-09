import React, {Component} from 'react';

class Produits extends Component {
  constructor(props) {
    super(props);
  }


  render() {
  return (
    <div>
      <h2>Mes produits</h2>
    {
      this.props.produits
        ? <div className="flex_r flex_w">

            {
              this.props.produits.map((p, i) => {
                return (<div key={i}>
                  <div className="admin_produits">
                    <ul>
                      <li></li>
                      <li key={'Produit_src' + i}><img className="miniature" src={'images/modeles/'+p.name+'/'+p.src+'.jpg'}></img></li>
                      <li key={'Produit_nom' + i}>{p.nom}</li>
                      <li key={'Produit_name' + i}>{p.name}</li>
                      <li key={'Produit_prix' + i}>{p.prix} €</li>
                      <li key={'Produit_frequence' + i}>{p.frequence} Hz</li>
                      <li key={'Produit_classement' + i}> Top {p.classement}</li>
                      <li key={'Produit_modele' + i}>{p.modele} cellules</li>
                      <li key={'Produit_nbColors' + i}>{p.nbColors} couleurs</li>
                      <li key={'Produit_nbpieces' + i}>{p.nbpieces} pièces</li>
                      <li key={'Produit_nbcarreaux' + i}>{p.nbcarreaux} carreaux</li>
                      <li key={'Produit_surface' + i}>{p.surface} m2</li>
                      <li key={'Produit_prixcolorsclient' + i}>{p.prixcolorsclient} € la couleur (client)</li>
                      <li key={'Produit_prof' + i}>{p.prof} cm</li>
                      <li key={'Produit_prixcolors' + i}>{p.prixcolors} € la couleur (réelle)</li>
                    </ul>
                  </div>
                </div>);
              })
            }
          </div>
        : null
    }</div>

)
}
}


export default Produits;
