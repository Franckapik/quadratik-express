import React, {Component} from 'react';

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      prix: 0,
      nom: '',
      qte: 0,
      sousTotal: 0,
      reduction: 0,
      toggleAutre: true,
      total: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.choixAutre = this.choixAutre.bind(this);

  }

  handleChange(event) {
    const name = event.target.name;
    if (name === "produitId") {
      if (event.target.value === "Autre") {
        this.choixAutre();
      } else {
        this.setState({
          prix: Number(this.props.produits[event.target.value].prix),
          nom: this.props.produits[event.target.value].nom
        });
      }
    } else {
      this.setState({[name]: event.target.value});
    }
  }

  appendInput() {
    const produit = {
      prix: this.state.prix,
      quantite: this.state.qte,
      name: this.state.nom,
      reduction: this.state.reduction,
      sous_total: this.state.qte * this.state.prix
    }

    this.setState({
      cart: this.state.cart.concat([produit])
    }, () => {

      this.setState({
        prix: 0,
        nom: '',
        qte: 0,
        sousTotal: 0,
        reduction: 0,
        toggleAutre : true,
        total: this.sumProduits
      })
    });
  }

  get sumProduits() {
    return this.state.cart.reduce((acc, val) => {
      return acc + val.sous_total;
    }, 0);
  }

  choixAutre() {
    this.setState(state => ({
      toggleAutre: !state.toggleAutre
    }));
  }

  render() {
    return (<div>

      <form className="flex_r box_light1 center">
        <label>
          Produit

          {this.state.toggleAutre ? <select name="produitId" onChange={this.handleChange}>
            <option>Liste de produits</option>
            {
              this.props.produits.map((n, a) => {
                return (<option value={a} key={"select" + a}>{n.nom}</option>)
              })
            }
            <option selected={this.choixAutre}>Autre</option>
          </select> :
        <input name="nom" value={this.state.nom} onChange={this.handleChange}/>
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

        <label><i className="fas fa-plus-circle" onClick={() => this.appendInput()}>
        </i></label>

      </form>

      <PanierDevis cart={this.state.cart} total={this.state.total}></PanierDevis>

      Valider le devis

    </div>);
  }

}

class PanierDevis extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (<div className="box_light2 width80 center">
      <div className="table ">
        <ul className="flex_c">
          <li className="table-header">
            <div className="col w10">Nom</div>
            <div className="col w25">Quantité</div>
            <div className="col w20">Prix</div>
            <div className="col w20">Montant</div>

          </li>
          {
            this.props.cart.map((p, i) => {
              return (<li className="table-row" key={"produit" + i}>
                <div className="col w10" data-label="Nom">{p.name}</div>
                <div className="col w25" data-label="Quantite">{p.quantite}</div>
                <div className="col w25" data-label="Prix">{p.prix}€</div>
                <div className="col w20" data-label="Montant">{p.sous_total}
                  €</div>
              </li>)
            })
          }
        </ul>
      </div>
      Total TTC : {this.props.total}
      €
    </div>)
  }
}

export default AddProduct
