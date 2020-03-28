import React, {Component} from 'react';
import {panierOperations} from '../Store/shopStore';


class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autre: true,
      id : 0,
      nom : 0,
      qte : 0,
      prix : 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.choixAutre = this.choixAutre.bind(this);

  }

  handleChange(event) {
    const name = event.target.name;
    if (name === "id") {
      if (event.target.value === "Autre") {
        this.setState(state => ({
          autre: !state.autre
        }))
      } else {
        this.setState({
          id : this.props.produits[event.target.value].id,
          prix: Number(this.props.produits[event.target.value].prix),
          nom: this.props.produits[event.target.value].nom,
        });
      }
    } else {
      this.setState({[name]: event.target.value});
    }
  }

  choixAutre() {
    this.setState(state => ({
      autre: !state.autre
    }))
  }

  appendInput(id, qte, prix, nom) {

  }

  get sumProduits() {
    return this.state.cart.reduce((acc, val) => {
      return acc + val.sous_total;
    }, 0);
  }

  render() {
    return (<div>

      <form className="flex_r box_light1 center">
        <label>
          Produit {
            this.state.autre
              ? <select name="id" onChange={this.handleChange}>
                  <option>Liste de produits</option>
                  {
                    this.props.produits.map((n, a) => {
                      return (<option value={n.id} key={"select" + a}>{n.nom}</option>)
                    })
                  }
                  <option selected={this.choixAutre}>Autre</option>
                </select>
              : <input name="nom" value={this.state.nom} onChange={this.handleChange}/>
          }
        </label>

        <label>
          Quantité
          <input name="qte" value={this.state.qte} onChange={this.handleChange}/>
        </label>

        <label>
          Prix
          <input name="prix" value={this.state.prix} onChange={this.handleChange}/>
        </label>

        <label>
          Sous-total
          <input name="sousTotal" value={this.state.qte * this.state.prix} onChange={this.handleChange}/>
        </label>

        <label>
          <i className="fas fa-plus-circle" onClick={() => panierOperations.addToCart(this.state.id, this.state.qte, this.state.prix, this.state.nom)}></i>
        </label>

      </form>

      

    </div>);
  }

}


export default AddProduct
