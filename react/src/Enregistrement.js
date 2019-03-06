import React, {Component} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import commandeStore from './commandeStore';
import {view} from 'react-easy-state';

var code_postal = /^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/;
var telephonefr = /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().min(1, 'Votre prénom est trop court').max(50, 'Votre prénom est trop long').required('Ce champs est vide'),
  lastName: Yup.string().min(2, 'Votre nom de famille est trop court').max(50, 'Votre nom de famille est trop long').required('Ce champs est vide'),
  adresse: Yup.string().min(2, 'Votre adresse est trop courte').max(80, 'Votre adresse est trop longue').required('Ce champs est vide'),
  ville: Yup.string().min(2, 'Votre nom de ville est trop court').max(45, 'Votre nom de ville est trop long').required('Ce champs est vide'),
  codepostal: Yup.string().matches(code_postal, {
    message: 'Code postal incorrect. Exemple: 95845',
    excludeEmptyString: true
  }).required('Ce champs est vide'),

  telephone: Yup.string().matches(telephonefr, {
    message: 'Numéro de téléphone incorrect',
    excludeEmptyString: true
  }).required('Ce champs est vide'),
  contexte: Yup.string().max(200, 'Votre réponse est trop longue'),

  email: Yup.string().email('Votre adresse mail est invalide').required('Ce champs est vide')
});

class Enregistrement extends Component {
  render() {
    return (<div>

      <div>
        <h1 className="center">Enregistrement de commande</h1>
        <Formik initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            adresse: '',
            ville: '',
            codepostal: '',
            telephone: '',
            contexte: ''
          }} validationSchema={SignupSchema} onSubmit={values => {
            commandeStore.enreg_recap = values;
            fetch('/saveInDB/enregistrement', {
              credentials: 'include',
              method: 'post',
              body: JSON.stringify(values),
              headers: new Headers({'Content-Type': 'application/json'})
            }).then(res => res.json()).then(res => {
              if (res.error) {
                console.log(res.error);
              } else {

                commandeStore.display = 'livraison';
                commandeStore.status = '60vw';

              }
            });

          }}>
          {
            ({errors, touched}) => (<Form className='flex_c form_enregistrement center'>
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
              <button className="boutique_header" type="submit">Submit</button>
            </Form>)
          }
        </Formik>

      </div>

    </div>)
  }
}

export default view(Enregistrement);
