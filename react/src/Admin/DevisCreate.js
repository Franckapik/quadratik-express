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
      submitted : false
    };

    this.submit = this.submit.bind(this);
  }

  submit({ formData}, e) {
    panierOperations.resetCart();
    panier.reduction = formData.reduction;
    formData.listeProduits.map((p,i) => {
      return panierOperations.addToCart(p.id, p.qte, p.prix, p.nom, p.unite, p.poids);
    })

    const body = {
      formData : formData,
      panier : panier
    }
    client.devisPost(body).then(res => {
      if (res.ok) {
        this.setState({
          submitted : true
        })
      } else {
        window.location = '/500';
      }
    });
  };

  componentDidMount() {
    client.adminFetch().then(adminData => {
      this.formData = {
        entreprise: {
          Nom_entreprise: adminData.info[0].nomentreprise,
          Adresse: adminData.info[0].adresse,
          Siret: adminData.info[0].siret,
          Code_postal: adminData.info[0].codepostal,
          Ville: adminData.info[0].ville,
          Pays: adminData.info[0].pays,
          Mail: adminData.info[0].mail,
          Telephone: adminData.info[0].telephone
        },
        client: {
          firstName: "Sanchez",
          lastName: "Rick",
          adresse: "3 rue tartempion",
          codepostal: "35000",
          ville: "Froopyland",
          pays: "France",
          email: "charlesDupond@yahoo.fr",
          telephone: "0631927481"
        },
        banque: {
          titulaire : adminData.info[0].titulaire,
          iban : adminData.info[0].iban,
          bic : adminData.info[0].bic,
        }
      };



    });
  }

  render() {
    return (<> {
      !this.state.submitted ? <>{
        devisSchema.schema
          ? <Form schema={devisSchema.schema
          } uiSchema={devisSchema.uiSchema
            } formData={this.formData
            } onChange={log(this.formData)
            } fields={fields
            } onSubmit={this.submit
            } onError={log("errors")}/>
          : "Erreur d'acquisition de donnée - Rafraichir la page "
      }</> : "Devis créé"
    }  < />
    )
  }
}

export default view(DevisCreate);
