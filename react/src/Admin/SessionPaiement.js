import React, {Component} from 'react';
import '../App.css';

class SessionPaiement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paiement: false
    };
  }

  componentDidMount() {
    fetch('/getFromDB/adminPaiement?sessid=' + this.props.sessid).then(response => response.json()).then(commande => {
      this.setState({paiement: commande});
    });

  }

  render() {
  return (
    <div className="client_column"> <h3>Paiement</h3>
{ this.state.paiement ? this.state.paiement.map((p, i) => {
        return (
          <div key={i}>
            <ul>
              <li key={'Paiement_' + i}>
                {p.amount}</li>
              <li key={'Paiement_mode' + i}>
                {p.mode}</li>
              <li key={'Paiement_cartdtype' + i}>
                {p.cardtype}</li>
              <li key={'Paiement_expirationdate' + i}>
                {p.expirationdate}</li>
              <li key={'Paiement_number' + i}>
                {p.number}</li>
              <li key={'Paiement_status' + i}>
                {p.status}</li>
              <li key={'Paiement_transactionid' + i}>
                {p.transactionid}</li>

            </ul>

          </div>
        )

  }) : null
} </div>

)
}
}


export default SessionPaiement;
