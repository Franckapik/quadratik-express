import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import commandeStore from '../Store/commandeStore';
import {view} from 'react-easy-state';
import * as Yup from 'yup';
import client from '../Store/client';

var code_postal = /^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/;

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().min(1, 'Votre prénom est trop court').max(50, 'Votre prénom est trop long').required('Ce champs est vide'),
  lastName: Yup.string().min(2, 'Votre nom de famille est trop court').max(50, 'Votre nom de famille est trop long').required('Ce champs est vide'),
  adresse: Yup.string().min(2, 'Votre adresse est trop courte').max(80, 'Votre adresse est trop longue').required('Ce champs est vide'),
  ville: Yup.string().min(2, 'Votre nom de ville est trop court').max(45, 'Votre nom de ville est trop long').required('Ce champs est vide'),
  codepostal: Yup.string().matches(code_postal, {
    message: 'Code postal incorrect. Exemple: 95845',
    excludeEmptyString: true
  }).required('Ce champs est vide'),
});


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
                  if(res.ok) {
                    commandeStore.display = 'paiement';
                    commandeStore.status = '80vw';
                  } else {
                    window.location ='/500' ;
                  }

                });
              

              }}
            >
              {({ errors, touched }) => (
                <Form className='flex_c form_enregistrement center'>
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
