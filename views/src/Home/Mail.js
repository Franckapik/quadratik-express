import React, {Component} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import client from '../Store/client';

const SignupSchema = Yup.object().shape({
  lastName: Yup.string().min(2, 'Votre nom de famille est trop court').max(50, 'Votre nom de famille est trop long').required('Ce champs est vide'),
  message: Yup.string().max(800, 'Votre réponse est trop longue').required('Veuillez écrire votre message'),
  superficie: Yup.string().max(3, 'Votre réponse est trop longue').required('Veuillez écrire votre superficie de pièce'),
  email: Yup.string().email('Votre adresse mail est invalide').required('Ce champs est vide')
});

class Mail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receptionMsg: ''
    };
  }

  render() {
    return (<div>
      <div>
        <h1>Contact par mail</h1>
        <Formik initialValues={{
            lastName: '',
            email: '',
            superficie: '',
            message: ''
          }} validationSchema={SignupSchema} onSubmit={values => {
            client.mailPost(values)
            .then(res => {
              if(res.ok) {
                this.setState({receptionMsg: 'Votre mail a bien été expédié. Nous vous répondrons dès que possible. Merci!'});
              } else {
                this.setState({receptionMsg: 'Une erreur est survenue. Vous pouvez nous envoyer votre demande à l adresse suivante : atelier@quadratik.fr. Merci!'});;
              }

            });

          }}>
          {
            ({errors, touched}) => ( <div>
{

  this.state.receptionMsg === '' ? <Form className='flex_c center'>

<label>
  <i className="fas fa-user"></i>
  Nom
</label>
<Field name="lastName"/>
<ErrorMessage name="lastName"/>

<label>
  <i className="fas fa-at"></i>
  Email
</label>
<Field name="email"/>
<ErrorMessage name="email"/>

<label>
  <i className="far fa-question-circle"></i>
  Superficie (m2)</label>
<Field name="superficie"/>
<ErrorMessage name="superficie"/>

<label>
  <i className="far fa-question-circle"></i>
  Votre message</label>
<Field name="message"/>
<ErrorMessage name="message"/>

<button type="submit">Envoyer</button>
</Form>
: <div>{this.state.receptionMsg}</div> }

              </div>
            )
          }
        </Formik>

      </div>

    </div>)
  }
}

export default Mail;
