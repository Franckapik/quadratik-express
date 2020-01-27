import React from 'react';
import * as Yup from 'yup';


const SignupSchema = Yup.object().shape({
    firstName: Yup.string().min(1, 'Votre prénom est trop court').max(50, 'Votre prénom est trop long').required('Ce champs est vide'),
    lastName: Yup.string().min(2, 'Votre nom de famille est trop court').max(50, 'Votre nom de famille est trop long').required('Ce champs est vide'),
    adresse: Yup.string().min(2, 'Votre adresse est trop courte').max(80, 'Votre adresse est trop longue').required('Ce champs est vide'),
    ville: Yup.string().min(2, 'Votre nom de ville est trop court').max(45, 'Votre nom de ville est trop long').required('Ce champs est vide'),
    codepostal: Yup.string().matches(/^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/, {
      message: 'Code postal incorrect. Exemple: 95845',
      excludeEmptyString: true
    }).required('Ce champs est vide'),

    telephone: Yup.string().matches(/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/, {
      message: 'Numéro de téléphone incorrect',
      excludeEmptyString: true
    }).required('Ce champs est vide'),
    contexte: Yup.string().max(200, 'Votre réponse est trop longue'),
    email: Yup.string().email('Votre adresse mail est invalide').required('Ce champs est vide')
  });

  export default SignupSchema;
