import React, {Component} from 'react';
import '../styles/App.scss';
import {panierOperations} from '../Store/shopStore';


class Produit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 1
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    let {
      nom,
      prix,
      frequence,
      nbColors,
      nbcellules,
      largeur,
      longueur,
      srcImg,
      unite,
      src,
      stock
        } = this.props;

    return (<div className="flex_c center produit">

      <h3>
        {nom}
      </h3>

      <p>
        <div className="produit_img_container">
          <a href={'/produit'+src}><img className="produit_img cursor" src={srcImg} alt='Affichage non disponible'/></a>
          <div className="produit_add flex_r">
            <div className="flex_r">
              <input className="input_qte" type="text" value={this.state.value} onChange={this.handleChange} size="2"/>
              <div className="flex_c">
                <i className="fas fa-plus cursor" onClick={() => {
                    this.setState(prevState => {
                      return {
                        value: prevState.value + 1
                      }
                    })
                  }}></i>
                <i className='fas fa-minus cursor' onClick={() => {
                    this.setState(prevState => {
                      return {
                        value: prevState.value - 1
                      }
                    })
                  }}></i>
              </div>
            </div>
          <span className="prix">{prix} €</span>
            <i className="fas fa-cart-arrow-down cart_add cursor" onClick={ () => {panierOperations.addToCart(this.props.id, this.state.value, this.props.prix, this.props.nom)}}></i>
          </div>
        </div>
      </p>

      <p>

        <i className="fas fa-chart-bar"/> {frequence} Hz

      </p>

      <p>

        <i className="fas fa-tint"/>{nbColors} couleur{nbColors > 1 ? 's' :null}

        <i className="fas fa-th-large"/>{nbcellules} cellule{nbcellules > 1 ? 's' :null} {unite > 1 ? <> < i className = "fab fa-codepen" />{ unite } unités de {largeur} x { longueur } cm < /> : <><i className="fab fa-codepen" / > { largeur } x { longueur } cm < />}

      </p>

      {stock.includes("Express") ?
        <p><i className="fas fa-rocket" style = {{color : '#DC143C'}}></i> {stock} </p>
      : <p><i class="fas fa-tools" style = {{color : '#00AB9C'}}></i> {stock}</p>
      }

    </div>)
  }
}

export default Produit;
