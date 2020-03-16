import React, {Component} from 'react';
import '../styles/App.scss';
import client from '../Store/client';


class SessionCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: false
    };
  }

  componentDidMount() {
    client.adminCartFetch(this.props.sessid).then(cart => {
      this.setState({cart: cart});
    });

  }

  render() {
  return (
    <div className="client_column"> <h3>Panier</h3>
{ this.state.cart.length ? this.state.cart.map((p, i) => {
        return (
          <div key={i}>
                      <ul>
                        <li key={'Panier_nom_qte' + i}>
                          {p.name} x {p.quantite}</li>
                        <li key={'Panier_reduction' + i}>
                          reduction : {p.reduction}</li>
                        <li key={'Panier_sous_total' + i}>
                          sous total : {p.sous_total}</li>
                      </ul>

          </div>
        )

  }) : "Pas de panier"
} </div>

)
}
}


export default SessionCart;
