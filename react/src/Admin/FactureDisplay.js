import React, {Component} from 'react';
import '../styles/App.scss';
import {view} from 'react-easy-state';
import client from '../Store/client';
import FileSaver from 'file-saver';

class FactureDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false
    }
  }

  componentDidMount() {
    this.getDevis(this.props.match.params.userid);
  }

  getDevis(id) {
    client.devisFetch(id).then(data => {
      this.setState({data: data})
    })

  }

  getDevisPdf(id) {
    client.devisPdfFetch(id).then(response => {
      return response.blob();
    }).then(myBlob => {
      FileSaver.saveAs(myBlob, "Facture.pdf");
    });
  }

  render() {
    const data = this.state.data;
    return (<div className="center">

      <h2>Facture Client</h2>

      <button className="left cursor givemespace" onClick={() => this.getDevisPdf(data.devis.id)}>
        Télécharger la Facture (PDF)
      </button>
      {
        data
          ? <div className="box_light2 width80 center">

              <h3>{data.user.prenom}
                {data.user.nom}</h3>
              <div className="flex_r givemespace">
                <div className="flex_c box_light1 left">
                  <ul>
                    <li key="nomentreprise">{data.devis.entreprise}</li>
                    <li key="adresse">{data.devis.adresse}</li>
                    <li key="codepostal">{data.devis.code_postal}
                      {data.devis.ville}</li>
                    <li key="pays">{data.devis.pays}</li>
                    <li key="mail">{data.devis.mail}</li>
                    <li key="tel">{data.devis.telephone}</li>
                    <li key="siret">SIRET {data.devis.siret}</li>
                  </ul>
                </div>
                {
                  data.devis.logo
                    ? <img alt="Logo Quadratik.fr" src={data.infos.logo} width="150px"></img>
                    : null
                }
                <div className="flex_c box_light1 right">
                  <ul>
                    <li key="nom">{data.user.prenom} {data.user.nom}</li>
                    <li key="codepostal">{data.user.postal} {data.user.ville}</li>
                    <li key="pays">{data.user.pays}</li>
                    <li key="mail">{data.user.mail}</li>
                    <li key="tel">{data.user.telephone}</li>
                  </ul>
                </div>
              </div>
              <div className="box_dark3 givemespace-hori">Facture N° {data.devis.numero}, réglée le {data.devis.date_devis}</div>
              <div className="table center ">
                <ul className="flex_c">
                  <li className="table-header">
                    <div className="col w10">Nom</div>
                    <div className="col w25">Quantité</div>
                    <div className="col w20">Prix</div>
                    <div className="col w20">Montant</div>

                  </li>
                  {
                    data.cart.map((p, i) => {
                      return (<li className="table-row" key={"produit" + i}>
                        <div className="col w10" data-label="Nom">{p.nom}</div>
                        <div className="col w25" data-label="Quantite">{p.quantite}
                        </div>
                        <div className="col w25" data-label="Prix">{p.prix}€</div>
                        <div className="col w20" data-label="Montant">{p.quantite * p.prix}
                          €</div>
                      </li>)
                    })
                  }
                </ul>
              </div>
              {
                data.cart[0].reduction
                  ? <div className="box_light3">Reduction : {data.cart[0].reduction}
                      €</div>
                  : null
              }
              <div className="box_light4">TOTAL (TTC) : {data.paiement.amount}
                €</div>

              <div>
                <p>Moyen de paiement utilisé : {data.devis.moyen_paiement}</p>
              </div>

            </div>
          : "chargement"
      }

      </div>)
  }
}

export default view(FactureDisplay);
