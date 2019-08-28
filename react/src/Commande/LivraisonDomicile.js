import React, {Component} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import commandeStore from '../Store/commandeStore';
import {view} from 'react-easy-state';

class LivraisonAdresse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ""
    };
  }

  componentDidMount() {
    fetch('/getFromDB/user', {
        credentials: 'include',
        method: 'GET',
        mode: "cors" // no-cors, cors, *same-origin
      }).then(response => response.json()).then(data => {
        console.log(data);
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
            fetch('/saveInDB/livraison', {
              credentials: 'include',
              method: 'post',
              body: JSON.stringify(values),
              headers: new Headers({'Content-Type': 'application/json'})
            }).then(response => {
              if(response.ok) {
                commandeStore.display = 'paiement';
                commandeStore.status = '80vw';
                return
              } else {
                console.log(response);
              }
            });

          }}>
          {
            ({errors, touched}) => (<Form className='flex_c form_enregistrement center'>
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
