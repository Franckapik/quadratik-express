import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import commandeStore from '../Store/commandeStore';
import client from '../Store/client';
import SignupSchema from './Forms/Validation';
import {view} from 'react-easy-state';

class LivraisonAdresse extends Component {
  render () {
    return (

      <div>

          <div>
            <Formik
              initialValues={{
                mode: 'nouvelleadresse',
                firstName: '',
                lastName: '',
                adresse: '',
                ville: '',
                codepostal: '',
              }}
              validationSchema={SignupSchema}
              onSubmit={values => {
                client.livraisonPost(values)
                .then(res => {
                  if (res.ok) {
                    if (!window.location.href.includes('admin')) {
                      commandeStore.display = 'paiement';
                      commandeStore.status = '80vw';
                    } else {
                      commandeStore.admindisplay='paiement'
                    }
                  } else {
                    window.location = '/500';
                  }

                });


              }}
            >
              {({ errors, touched }) => (
                <Form className='flex_c form center'>
                  <Field name="userid" type="hidden" />
                  <label><i className="fas fa-user"></i> Nom </label>
                  <Field name="lastName" />
                  <ErrorMessage name="lastName" />

                  <label><i className="far fa-user"></i> Prénom </label>
                  <Field name="firstName" />
                  <ErrorMessage name="firstName" />

                  <label><i className="fas fa-address-book"></i> Adresse </label>
                  <Field name="adresse" />
                  <ErrorMessage name="adresse" />

                  <label><i className="fas fa-building"></i> Ville </label>
                  <Field name="ville" />
                  <ErrorMessage name="ville" />

                  <label><i className="fas fa-home"></i> Code Postal </label>
                  <Field name="codepostal" />
                  <ErrorMessage name="codepostal" />

                  <button className="boutique_header" type="submit">Valider</button>
                </Form>
              )}
            </Formik>

          </div>

        </div>


    )
  }
}





export default view (LivraisonAdresse);
