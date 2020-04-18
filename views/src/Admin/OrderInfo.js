import React, {Component} from 'react';
import '../styles/App.scss';
import client from '../Store/client';

class OrderInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: false
    };
  }

  componentDidMount() {
    client.orderFetch(this.props.sessid).then(order => {
      this.setState({order: order});
    });
  }

  render() {
    const u = this.state.order.user;
    const l = this.state.order.livraison;
    const c = this.state.order.cart;
    const p = this.state.order.paiement;
    return (<div className="flex_r flex_baseline fullsize">
      {
        u
          ? <ul>
              <li key={'Client_nom'}>
                {u.nom}
              </li>
              {
                u.prenom
                  ? <li key={'Client_prenom'}>{u.prenom}</li>
                  : null
              }
              <li key={'Client_adresse'}>{u.adresse}</li>
              <li key={'Client_ville'}>{u.postal + u.ville}</li>
              <li key={'Client_mail'}>{u.mail}</li>
              <li key={'Client_telephone'}>{u.telephone}</li>
            </ul>
          : 'Utilisateur manquant'
      }

      {
        l
          ? <ul>
              <li key={'Livraison_mode'}>
                {l.livr_mode}</li>
              <li key={'Livraison_nom'}>
                {l.livr_nom}</li>
              <li key={'Livraison_adresse'}>
                {l.livr_adresse}</li>
              <li key={'Livraison_ville'}>
                {l.livr_postal + l.livr_ville}</li>
            </ul>
          : 'Livraison manquante'
      }

      {
        c
          ? <div>{c.map((p, i) => {
            return (<ul key={i}>
              <li key={'Panier_nom_qte' + i}>
                {p.nom}
                x {p.quantite}</li>
              <li key={'Panier_reduction' + i}>
                reduction : {p.reduction}</li>
              <li key={'Panier_sous_total' + i}>
                sous total : {p.sous_total}</li>
            </ul>)
          })} </div>
        : "Panier manquant"
      }

      {
        p
          ? <ul>
              <li key={'Paiement_'}>
                {p.amount}</li>
              <li key={'Paiement_mode'}>
                {p.mode}</li>
              <li key={'Paiement_cartdtype'}>
                {p.cardtype}</li>
              <li key={'Paiement_expirationdate'}>
                {p.expirationdate}</li>
              <li key={'Paiement_number'}>
                {p.number}</li>
              <li key={'Paiement_status'}>
                {p.status}</li>
              <li key={'Paiement_transactionid'}>
                {p.transactionid}</li>
              <li key={'Paiement_profileid'}>
                {p.profileid}</li>
              <li key={'Paiement_orderid'}>
                <a href={"/order/" + p.orderid}>
                  Commande : {p.orderid}
                </a>
              </li>
            </ul>
          : 'Paiement manquant'
      }
    </div>)
  }
}

export default OrderInfo;
