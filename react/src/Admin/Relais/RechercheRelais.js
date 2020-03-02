import React, {Component} from 'react';
import client from '../../Store/client';
import {view} from 'react-easy-state';
import commandeStore from '../../Store/commandeStore';
import {rechercheRelaisSchema} from '../../forms';
import {rechercheRelaisSchemaClient} from '../../forms';
import Form from "react-jsonschema-form";

const log = (type) => console.log.bind(console, type);

class RechercheRelais extends Component {

  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
    this.handleSubmitSessid = this.handleSubmitSessid.bind(this);

    this.formData = {
      poids: 2,
      longueur: 50,
      largeur: 50,
      hauteur: 50,
      adresse: "1 rue magenta",
      ville: "Rennes",
      code_postal:35000,
      transporteur: "SOGP"
    };

  }

  componentDidMount() {
    if (!this.props.admin) {
      this.initialAdress().then(user => {
        this.formData.adresse = user.adresse;
        this.formData.code_postal = user.postal;
        this.formData.ville = user.ville;
        this.forceUpdate();
        this.getCotation(this.formData);
      });
    }
  }

  initialAdress() {
    return client.userFetch().then(user => {
      if (user.length === 0) {
        commandeStore.cotation = false;
      } else {
        return user
      }
    });
  }

  getCotation(data) {
    client.cotationFetch(data)
    .then(cot => {
      if(data.error) {
        commandeStore.cotation = false;
      } else {
        commandeStore.cotation = cot.cotation.shipment[0];
        commandeStore.service = cot.cotation.shipment[0].offer[0].service[0].code[0];
      }
    });
  }



  handleSubmitSessid(event) {
  client.adminUserFetch(this.state.sessid)
      .then(user => {
        this.formData.adresse = user.adresse;
        this.formData.postal = user.postal;
        this.formData.ville = user.ville;
      });
  }

  submit({ formData}, e) {
    this.getCotation(formData);
  }

  render() {
    return (<div>
      {
        this.props.admin
          ? <Form schema={rechercheRelaisSchema.schema } uiSchema={rechercheRelaisSchema.uiSchema } formData={this.formData} onChange={log(this.formData)} onSubmit={this.submit} > <button type="submit">Nouvelle adresse</button> </Form>
        : <Form schema={rechercheRelaisSchemaClient.schema } uiSchema={rechercheRelaisSchemaClient.uiSchema } formData={this.formData} onChange={log(this.formData)} onSubmit={this.submit} > <button type="submit">Valider</button> </Form>
      }
    </div>)
  }
}

export default view(RechercheRelais);
