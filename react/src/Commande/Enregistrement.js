import React, {Component} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import commandeStore from '../Store/commandeStore';
import {view} from 'react-easy-state';
import client from '../Store/client';
import SignupSchema from './Forms/Validation';

class Enregistrement extends Component {
  render() {
    return (<Formik initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        adresse: '',
        ville: '',
        codepostal: '',
        telephone: '',
        contexte: ''
      }} validationSchema={SignupSchema} onSubmit={values => {
        client.enregistrementPost(values).then(res => {
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

      }}>
      {
        ({errors, touched}) => (<Form className='flex_c  center'>
          <Field name="userid" type="hidden"/>
          <label>
            <i className="fas fa-user"></i>
            Nom
          </label>
          <Field name="lastName"/>
          <ErrorMessage name="lastName"/>

          <label>
            <i className="far fa-user"></i>
            Prénom
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

          <label>
            <i className="fas fa-phone"></i>
            Téléphone
          </label>
          <Field name="telephone"/>
          <ErrorMessage name="telephone"/>

          <label>
            <i className="fas fa-at"></i>
            Email
          </label>
          <Field name="email"/>
          <ErrorMessage name="email"/>

          <label>
            <i className="far fa-question-circle"></i>
            Dans quel contexte allez-vous utiliser les produits achetés ? (Réponse optionelle)</label>
          <Field name="contexte"/>
          <ErrorMessage name="contexte"/>
          <button type="submit">Valider</button>
        </Form>)
      }
    </Formik>)
  }
}

export default view(Enregistrement);
