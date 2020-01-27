import React, {Component} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import commandeStore from '../Store/commandeStore';
import {view} from 'react-easy-state';
import client from '../Store/client';

class LivraisonAdresse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ""
    };
  }

  componentDidMount() {
    client.userFetch().then(data => {
      this.setState({
        user: data
      });
    });
  }

  render() {
    return (<div>

      <div>
        <Formik enableReinitialize="enableReinitialize" initialValues={{
            mode: 'domicile',
            firstName: String(this.state.user.prenom + ' ' + this.state.user.nom),
            adresse: String(this.state.user.adresse),
            ville: String(this.state.user.ville),
            codepostal: String(this.state.user.postal)
          }} onSubmit={values => {
            client.livraisonPost(values)
            .then(res => {
              if (res.ok) {
                if (!window.location.href.includes('admin')) {
                  commandeStore.display = 'paiement';
                  commandeStore.status = '80vw';
                } else {
                  commandeStore.admindisplay = 'paiement';
                }
              } else {
                window.location = '/500';
              }

            });

          }}>
          {
            ({errors, touched}) => (<Form className='flex_c form  center'>
              <Field name="userid" type="hidden"/>
              <label>
                <i className="far fa-user"></i>
                Nom Complet
              </label>
              <Field name="firstName"/>
              <ErrorMessage name="firstName"/>

              <label>
                <i className="fas fa-address-book"></i>
                Adresse
              </label>
              <Field name="adresse"/>
              <ErrorMessage name="adresse"/>

              <label>
                <i className="fas fa-building"></i>
                Ville
              </label>
              <Field name="ville"/>
              <ErrorMessage name="ville"/>

              <label>
                <i className="fas fa-home"></i>
                Code Postal
              </label>
              <Field name="codepostal"/>
              <ErrorMessage name="codepostal"/>

              <button className="boutique_header" type="submit">Confirmer</button>
            </Form>)
          }
        </Formik>

      </div>

    </div>)
  }
}

export default view(LivraisonAdresse);
