import React, {Component} from 'react';
import shopStore from './shopStore';
import {view} from 'react-easy-state';

class Cart extends Component {

  render() {
    console.log(shopStore.cart.length)
    const A = () => <tbody>{
        shopStore.cart.map((p, i) => {
          return <tr key={i}>
            <td><img src={p.produit.srcImg} alt='Aperçu du produit'/></td>
            <td>{p.produit.nom}</td>
            <td >{p.qte}</td>
            {
              this.props.control
                ? <span>
                    <td>
                      <i className="fas fa-plus cursor" onClick={shopStore.plusCart.bind(p.produit.nom)}></i>
                    </td>
                    <td>
                      <i className='fas fa-minus cursor' onClick={shopStore.lessCart.bind(p.produit.nom)}></i>

                    </td>
                    <td >
                      <i className="fas fa-times cursor" onClick={shopStore.removeFromCart.bind(p.produit.nom)}></i>
                    </td>
                  </span>

                : null
            }
            {
              this.props.prices
                ? <span>
                    <td>
                      {p.produit.prix} €
                    </td>
                    <td>
                      {p.produit.packaging} €

                    </td>
                    <td >
                      {(p.produit.prix + p.produit.packaging) * p.qte} € TTC
                    </td>
                  </span>

                : null
            }
          </tr>
        })
      }</tbody>;
    return (<div className="cart">
      <table style={this.props.background? {'background-color' : 'white'} :null}>
        <tr>
          <th>
            Aperçu
          </th>
          <th>
            Nom
          </th>
          <th>
            Quantité</th>
          {
            this.props.control
              ? <strong>
                  <th></th>
                  <th></th>
                  <th ></th>
                </strong>

              : null
          }
          {
            this.props.prices
              ? <strong>
                  <th>Article</th>
                  <th>
                    Frais de ports

                  </th>
                  <th >
                    Sous-total</th>
                </strong>

              : null
          }
        </tr>
        <A/>
      </table>
    </div>)

  }

}

export default view(Cart);
