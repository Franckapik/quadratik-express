import React, {Component} from 'react';
import '../styles/App.scss';
import client from '../Store/client';

class SessionPaiement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paiement: false
    };
  }

  componentDidMount() {
    client.adminPaiementFetch(this.props.sessid).then(commande => {
      this.setState({paiement: commande});
    });

  }

  render() {
    const a = this.state.paiement;
    return (<div className="client_column">
      <h3>Paiement</h3>
      {
        a
          ? <ul>
              <li key={'Paiement_'}>
                {a.amount}</li>
              <li key={'Paiement_mode'}>
                {a.mode}</li>
              <li key={'Paiement_cartdtype'}>
                {a.cardtype}</li>
              <li key={'Paiement_expirationdate'}>
                {a.expirationdate}</li>
              <li key={'Paiement_number'}>
                {a.number}</li>
              <li key={'Paiement_status'}>
                {a.status}</li>
              <li key={'Paiement_transactionid'}>
                {a.transactionid}</li>
              <li key={'Paiement_profileid'}>
                {a.profileid}</li>
              <li key={'Paiement_orderid'}>
                <a href={"/order/" + a.orderid}>
                  Commande : {a.orderid}
                </a>
              </li>
            </ul>
          : null
      }
    </div>)
  }
}

export default SessionPaiement;
