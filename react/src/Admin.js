import React, {Component} from 'react';
import './App.css';
import auth0Client from './Auth';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
      produits: false,
      essence: false,
      info: false,
      filterLast: 1,
      user_id: false
    };
  }

  componentDidMount() {
    fetch('/getFromDB/adminData?user=' + auth0Client.getProfile().name).then(response => response.json()).then(adminData => {
      this.setState({user: adminData.user});
      this.setState({produits: adminData.product});
      this.setState({essence: adminData.essence});
      this.setState({info: adminData.info});
      this.setState({user_id: auth0Client.getProfile().name});

    });

  }

  render() {

  return (<div>
      <h1>Admin</h1>

      <hr></hr>
      Utilisateur actuel (name) | {this.state.user_id}
      <hr></hr>
      <h2>--- Informations générales</h2>
      {
        this.state.info
          ? <div>

              {
                this.state.info.map((p, i) => {
                  return (<div key={i}>
                    <div className="">
                      <ul>
                        <li key={'Info_nomentreprise' + i}>{p.nomentreprise}</li>
                        <li key={'Info_adresse' + i}>{p.adresse}</li>
                        <li key={'Info_siret' + i}>SIRET {p.siret}</li>
                        <li key={'Info_sirene' + i}>SIRENE {p.sirene}</li>
                        <li key={'Info_ape' + i}>APE {p.ape}</li>

</ul>
                    </div>
                  </div>);
                })
              }
            </div>
          : null
      }

      <ul className="flex_r boutique_filter">
        <li onClick={() => this.setState({filterLast: this.state.user.length})}>Toutes les user</li>
        <li onClick={() => this.setState({filterLast: 20})}>
          20</li>
        <li onClick={() => this.setState({filterLast: 10})}>
          10</li>
        <li onClick={() => this.setState({filterLast: 5})}>5</li>
        <li onClick={() => this.setState({filterLast: 1})}>La dernière</li>
      </ul>
      <hr></hr>
      <h2>--- user</h2>
      {
        this.state.user
          ? <div>
              {
                this.state.user.sort(function(a, b) {
                  return a.id - b.id
                }).slice(Math.max(this.state.user.length - this.state.filterLast, 1)).map((p, i) => {
                  return (<div key={i}>
                    <h2>
                      Client [{p.id}] : {p.prenom + ' ' + p.nom}
                    </h2>
                    [{p.sessid}]
                    <div className="admin_list">

                      <ul>
                        <li key={'Client_title' + i}>
                          <h3>Adresse personelle</h3>
                        </li>
                        <li key={'Client_nom' + i}>
                          {p.nom}
                        </li>
                        <li key={'Client_prenom' + i}>{p.prenom}</li>
                        <li key={'Client_adresse' + i}>{p.adresse}</li>
                        <li key={'Client_ville' + i}>{p.postal + p.ville}</li>
                        <li key={'Client_mail' + i}>{p.mail}</li>
                        <li key={'Client_telephone' + i}>{p.telephone}</li>
                      </ul>
                      <ul>
                        <li key={'Livraison_title' + i}>
                          <h3>Livraison</h3>
                        </li>
                        <li key={'Livraison_mode' + i}>
                          {p.livr_mode}</li>
                        <li key={'Livraison_nom' + i}>
                          {p.livr_nom}</li>
                        <li key={'Livraison_adresse' + i}>
                          {p.livr_adresse}</li>
                        <li key={'Livraison_ville' + i}>
                          {p.livr_postal + p.livr_ville}</li>

                      </ul>
                      <ul>
                        <li key={'Panier_title' + i}>
                          <h3>Panier</h3>
                        </li>
                        <li key={'Panier_qte' + i}>
                          {p.quantite}</li>
                        <li key={'Panier_fdp' + i}>
                          {p.fdp}</li>
                        <li key={'Panier_reduction' + i}>
                          {p.reduction}</li>
                        <li key={'Panier_total' + i}>
                          {p.total}</li>
                        <li key={'Panier_cart' + i}>
                          {p.cart.split("src").shift()}</li>
                      </ul>
                      <ul>
                        <li key={'Paiement_title' + i}>
                          <h3>Paiement</h3>
                        </li>
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
                  </div>);
                })
              }
            </div>
          : null
      }

      <hr></hr>
      <h2>--- Produits</h2>
      {
        this.state.produits
          ? <div className="flex_r flex_w">

              {
                this.state.produits.map((p, i) => {
                  return (<div key={i}>
                    <div className="admin_produits">
                      <ul>
                        <li key={'Produit_nom' + i}>{p.nom}</li>
                        <li key={'Produit_name' + i}>{p.name}</li>
                        <li key={'Produit_prix' + i}>{p.prix} €</li>
                        <li key={'Produit_frequence' + i}>{p.frequence} Hz</li>
                        <li key={'Produit_classement' + i}> Top {p.classement}</li>
                        <li key={'Produit_modele' + i}>{p.modele} cellules</li>
                        <li key={'Produit_nbColors' + i}>{p.nbColors} couleurs</li>
                        <li key={'Produit_nbpieces' + i}>{p.nbpieces} pièces</li>
                        <li key={'Produit_nbcarreaux' + i}>{p.nbcarreaux} carreaux</li>
                        <li key={'Produit_surface' + i}>{p.surface} m2</li>
                        <li key={'Produit_prixcolorsclient' + i}>{p.prixcolorsclient} € la couleur (client)</li>
                        <li key={'Produit_prof' + i}>{p.prof} cm</li>
                        <li key={'Produit_prixcolors' + i}>{p.prixcolors} € la couleur (réelle)</li>
                      </ul>
                    </div>
                  </div>);
                })
              }
            </div>
          : null
      }

      <hr></hr>
      <h2>--- Frais de constrcution</h2>
      {
        this.state.essence
          ? <div>

              {
                this.state.essence.map((p, i) => {
                  return (<div key={i}>
                    <div className="">
                      <ul>
                        <li key={'Essence_essence' + i}>{p.essence}</li>
                        <li key={'Essence_prixessence' + i}>Prix au m2: {p.prixessence} €</li>
                        <li key={'Essence_prixessenceclient' + i}>Prix facturé au m2: {p.prixessenceclient} €</li>
                        <li key={'Essence_poidsessencem2' + i}>Poids au m2: {p.poidsessencem2} kg</li>

</ul>
                    </div>
                  </div>);
                })
              }
            </div>
          : null
      }


    </div>)

  }
}

export default Admin;
