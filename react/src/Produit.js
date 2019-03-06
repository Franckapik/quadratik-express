import React, { Component } from 'react';
import './App.css';
import shopStore from './shopStore';


class Produit extends Component {

  constructor(props) {
    super(props);
    this.state = {value: 1};

    this.handleChange = this.handleChange.bind(this);
  }

  produitClicked() {
    if (this.props.onClick) {
      this.props.onClick(this.props.nom);
      shopStore.showDetails = true;
      shopStore.width = '100%';
      shopStore.selected = this.props;

    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }


  render() {
    let {nom, prix, frequence, classement, nbColors, nbcellules, largeur, longueur, srcImg} = this.props;

    return (
      <div className="flex_c center produit" >

        <h3>
          {nom}
        </h3>

        <p>
          {prix} €
        </p>

        <p>
          <img className="produit_img cursor" src={srcImg} alt='Affichage non disponible' onClick={this.produitClicked.bind(this)} />
        </p>




        <p>

          <i className="fas fa-chart-bar" /> {frequence} Hz

          <i className="fas fa-star" /> Top {classement}
        </p>

        <p>

          <i className="fas fa-tint" />{nbColors} couleur(s)

          <i className="fas fa-th-large" />{nbcellules} celules

        <i className="fab fa-codepen" />  {largeur} x {longueur} cm
        </p>

  <label>
    Quantité
  <input className="input_qte" type="text" value={this.state.value} onChange={this.handleChange} size="2"/>
  </label>


<p></p>
        <button onClick={shopStore.addToCart.bind(this)}>
          Ajouter au panier
        </button>

      </div>
    )
  }
}

export default Produit;
