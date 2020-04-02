import React, {Component} from 'react';
import '../styles/App.scss';
import {view} from 'react-easy-state';
import client from '../Store/client';
import Form from "react-jsonschema-form";
import panier, {panierOperations} from '../Store/shopStore';
import ChoixProduit from './DevisChoixProduit';
import devisSchema from './forms/devis.js'

const log = (type) => console.log.bind(console, type);

const fields = {
  prod: ChoixProduit
};

class DevisCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false
    };
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    Promise.all([
      client.infoFetch(),
      client.adminUserFetch(this.props.match.params.userid),
      client.adminCartFetch(this.props.match.params.userid)
    ]).then(([info, user, cart]) => {
      console.log(user);
      this.formData = {
        coordonnées: {
          entreprise: {
            Nom_entreprise: info[0].nomentreprise,
            Adresse: info[0].adresse,
            Siret: info[0].siret,
            Code_postal: info[0].codepostal,
            Ville: info[0].ville,
            Pays: info[0].pays,
            Mail: info[0].mail,
            Telephone: info[0].telephone
          },
          client: {
            firstName: user.prenom,
            lastName: user.nom,
            adresse: user.adresse,
            codepostal: user.postal,
            ville: user.ville,
            pays: user.pays,
            email: user.mail,
            telephone: user.telephone
          }
        },
        parametres: {
          banque: {
            titulaire: info[0].titulaire,
            iban: info[0].iban,
            bic: info[0].bic
          }
        },
        listeProduits: []
      };

      cart.map((a, i) => {
        let produit = {};
        var i = panierOperations.infos.findIndex(x => x.nom === a.nom);
        if (i !== -1) {
        produit.autre = false;
        produit.id = panierOperations.infos[i].id;
        produit.nom = panierOperations.infos[i].nom;
        produit.poids =  panierOperations.infos[i].poids;
        produit.prix =  panierOperations.infos[i].prix;
        produit.qte = a.quantite;
        produit.unite = panierOperations.infos[i].unite;
        this.formData.listeProduits.push(produit);
      }
      })

      this.forceUpdate();

    });
  }

  submit({
    formData
  }, e) {
    panierOperations.resetCart();
    panier.reduction = formData.parametres.autres.reduction;
    formData.listeProduits.map((p, i) => {
      return panierOperations.addToCart(p.id, p.qte, p.prix, p.nom, p.unite, p.poids);
    })

    const body = {
      formData: formData,
      panier: panier,
      sessid: this.props.match.params.userid
    }
    client.devisPost(body).then(res => {
      if (res.ok) {
        this.setState({submitted: true})
        panierOperations.resetCart();
      } else {
        window.location = '/500';
        panierOperations.resetCart();
      }
    });
  };

  render() {
    return (<> {
      !this.state.submitted
        ? <> {
          devisSchema.schema
            ? <Form className="fullsize center hidden-title" schema={devisSchema.schema} uiSchema={devisSchema.uiSchema} formData={this.formData} onChange={log(this.formData)} fields={fields} onSubmit={this.submit} onError={log("errors")}>
                <button type="submit">Valider</button>
              </Form>
            : "Erreur d'acquisition de donnée - Rafraichir la page "
        }</>
        : <a href={"/devis/" + this.props.match.params.userid}>
            <button>
              Afficher le devis</button>
          </a>
    } < />
    )
  }
}

export default view(DevisCreate);
