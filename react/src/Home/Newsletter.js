import React, {Component} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import client from '../Store/client';

const SignupSchema = Yup.object().shape({
  lastName: Yup.string().min(2, 'Votre nom de famille est trop court').max(50, 'Votre nom de famille est trop long').required('Ce champs est vide'),
  email: Yup.string().email('Votre adresse mail est invalide').required('Ce champs est vide')
});

class Newsletter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receptionMsg: false
    };
  }

  render() {
    return (<div>
      <div>
        <h1>S'abonner à la Newsletter</h1>
        <Formik initialValues={{
            lastName: '',
            email: ''
          }} validationSchema={SignupSchema} onSubmit={values => {
            client.newsletterPost(values)
            .then(res => {
              
              if(res.ok) {
                this.setState({receptionMsg: 'Votre email a bien été enregistré à la newsletter. Merci!'});
              } else {
                this.setState({receptionMsg: 'Une erreur est survenue. Vous pouvez vous enregistrer en nous envoyant votre demande à l adresse suivante : atelier@quadratik.fr. Merci!'});;
              }

            });
          }}>
          {
            ({errors, touched}) => ( <div>
{

  !this.state.receptionMsg ? <Form className='flex_c center'>

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

<button type="submit">S'abonner</button>
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

export default Newsletter;
