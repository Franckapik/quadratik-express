import React, {Component} from 'react';
import '../App.css';

class SessionCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: false
    };
  }

  componentDidMount() {
    fetch('/getFromDB/adminCart?sessid=' + this.props.sessid).then(response => response.json()).then(cart => {
      this.setState({cart: cart});
    });

  }

  render() {
  return (
    <div className="client_column"> <h3>Panier</h3>
{ this.state.cart ? this.state.cart.map((p, i) => {
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

  }) : null
} </div>

)
}
}


export default SessionCart;
