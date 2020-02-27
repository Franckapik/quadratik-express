import React, {Component} from 'react';
import commandeStore from '../Store/commandeStore';
import {view} from 'react-easy-state';
import client from '../Store/client';
import enregistrementSchema from '../forms.js'
import Form from "react-jsonschema-form";


const log = (type) => console.log.bind(console, type);

class Enregistrement extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit({ formData}, e) {
    client.enregistrementPost(formData)
    .then(res => {
      if (res.ok) {
        if (!window.location.href.includes('admin')) {
          commandeStore.display = 'livraison';
          commandeStore.status = '60vw';
        } else {
          commandeStore.admindisplay = 'livraison';
        }
      } else {
        window.location = '/500';
      }
    });
  };

  render() {
    return (
        <Form schema={enregistrementSchema.schema } uiSchema={enregistrementSchema.uiSchema } formData={enregistrementSchema.formData } onChange={log(this.formData) } onSubmit={this.submit } onError={log("errors")}/>
    )
  }
}

export default view(Enregistrement);
