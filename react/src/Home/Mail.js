import React, {Component} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

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

  getResponse(res){
    console.log('ici');
    if (res.error) {
      console.log(res.error);
      this.setState({receptionMsg: 'Une erreur est survenue lors de l envoi de votre message. Veuillez nous envoyer un message à l adresse suivante : contact@quadratik.fr. Merci!'});
    } else {
      console.log(res.success);
      this.setState({receptionMsg: res.success});
    }
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
            fetch('/sendMail/mailcontact', {
              credentials: 'include',
              method: 'post',
              body: JSON.stringify(values),
              headers: new Headers({'Content-Type': 'application/json'})
            }).then(res => res.json())
            .then(res => this.getResponse(res) );

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
