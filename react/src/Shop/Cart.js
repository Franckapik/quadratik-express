import React, {Component} from 'react';
import shopStore from '../Store/shopStore';
import {view} from 'react-easy-state';

class Cart extends Component {

  render() {
    return (<div className="cart">
      <table style={this.props.background
          ? {
            'backgroundColor': 'white'
          }
          : null}>
        <tbody>
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
                ? <>
                <th></th>
                <th></th>
                <th></th>
              </>
                : null
            }
            {
              this.props.prices
                ? <> <th> Article</th> <th> Frais de ports </th>
                  <th>
                    Sous-total</th> </>

                : null
            }
          </tr>
          {
            shopStore.cart.map((p, i) => {
              return <tr key={i}>
                <td><img src={p.produit.srcImg} alt='Aperçu du produit'/></td>
                <td>{p.produit.nom}</td>
                <td>{p.qte}</td>
                {
                  this.props.control
                    ? <> <td> <i className="fas fa-plus cursor" onClick={shopStore.plusCart.bind(p.produit.nom)}></i>
                    </td>
                    <td>
                      <i className='fas fa-minus cursor' onClick={shopStore.lessCart.bind(p.produit.nom)}></i>

                    </td>
                    <td>
                      <i className="fas fa-times cursor" onClick={shopStore.removeFromCart.bind(p.produit.nom)}></i>
                    </td>
                  </>

                    : null
                }
                {
                  this.props.prices
                    ? <> <td> {
                      p.produit.prix
                    }
                    € </td>
                        <td>
                          {p.produit.packaging} €

                        </td> <td>
                        {(p.produit.prix + p.produit.packaging) * p.qte}
                        € TTC
                      </td>
                    </>

                    : null
                }
              </tr>
            })
          }
        </tbody>
      </table>

        <i className="fas fa-times cursor" onClick={shopStore.resetCart}></i>
    </div>)

  }

}

export default view(Cart);
