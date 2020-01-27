import React, {Component} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import client from '../Store/client';

class Questionnaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receptionMsg: ''
    };
  }


  render() {
    return (<div>
      <div>
        <h1>Description de votre pièce</h1>

        <Formik initialValues={{
            lastName: '',
            email: '',
            longueur: '',
            largeur: '',
            hauteur: '',
            utilisation: '',
            traitement_souhait: '',
            traitement_indesirable: '',
            traitement_existant: '',
            traitement_interet: '',
            budget: '',
            traitement_type: '',
            traitement_perso: '',
            autres: ''
          }} onSubmit={values => {
            client.questionnairePost(values)
            .then(res => {
              if(res.ok) {
                this.setState({receptionMsg: 'Le formulaire nous a bien été envoyé. Nous vous répondrons dès que possible. Merci!'});
              } else {
                this.setState({receptionMsg: 'Une erreur est survenue. Vous pouvez nous envoyer votre demande à l adresse suivante : atelier@quadratik.fr. Merci!'});;
              }

            });

          }}>
          {
            ({errors, touched}) => (<div>
              {

                this.state.receptionMsg === ''
                  ? <div>
                  <span>Envoyez-nous les caractéristiques de votre pièce pour recevoir une réponse complète sur les traitements acoustiques éventuels.</span>

                  <Form className='flex_c center'>

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
                          Longueur</label>
                        <Field name="longueur"/>
                        <ErrorMessage name="longueur"/>
                        <label>
                          <i className="far fa-question-circle"></i>
                          Largeur
                        </label>
                        <Field name="largeur"/>
                        <ErrorMessage name="largeur"/>
                        <label>
                          <i className="far fa-question-circle"></i>
                          Hauteur</label>
                        <Field name="hauteur"/>
                        <ErrorMessage name="hauteur"/>


                      <label>
                        <i className="far fa-question-circle"></i>
                        Quel est le type d'utilisation de votre pièce ?</label>
                      <Field component="select" name="utilisation">
                        <option value="Aucune réponse">Selectionner votre choix</option>
                        <option value="mix">Mixage</option>
                        <option value="mastering">Mastering</option>
                        <option value="hcinema">Home Cinéma</option>
                        <option value="hifi">Salon Hifi</option>
                        <option value="piècevie">Pièce de vie</option>
                        <option value="répé">Salle de répétition</option>
                        <option value="public">Espace public d'accueil</option>
                      </Field>

                      <label>
                        <i className="far fa-question-circle"></i>
                        Avez-vous relevé un effet indésirable sur l'acoustique de votre pièce?</label>
                      <Field component="select" name="traitement_indesirable">
                        <option value="Aucune réponse">Selectionner votre choix</option>

                        <option value="Je n'ai pas relevé d'effet indésirable">
                          Je n'ai pas relevé d'effet indésirable
                        </option>

                        <option value="Manque de clarté et précision">
                          Manque de clarté et précision
                        </option>
                        <option value="Un son pas homogène dans la pièce">
                          Un son pas homogène dans la pièce
                        </option>
                        <option value="Basses trop importantes">
                          Basses trop importantes
                        </option>
                        <option value="Résonnances aigües">
                          Résonnances aigües
                        </option>
                        <option value="Le son paraît etouffé">
                          Le son paraît etouffé
                        </option>
                        <option value="Un déséquilibre stéréo">
                          Un déséquilibre stéréo
                        </option>
                        <option value="Echo trop important">
                          Echo trop important
                        </option>
                        <option value="Réponse en fréquence irrégulière">
                          Réponse en fréquence irrégulière</option>

                      </Field>

                      <label>
                        <i className="far fa-question-circle"></i>
                        Quel traitement estimez-vous necessaire pour votre pièce?</label>
                      <Field component="select" name="traitement_souhait">
                        <option value="Aucune réponse">Selectionner votre choix</option>
                        <option value="Diffusion">
                          Diffusion
                        </option>
                        <option value="Absorption">
                          Absorption
                        </option>
                        <option value="Les deux traitements">
                          Les deux traitements
                        </option>
                      </Field>

                      <label>
                        <i className="far fa-question-circle"></i>
                        Quels sont les éventuels traitements existants ?</label>
                      <Field name="traitement_existant"/>
                      <ErrorMessage name="traitement_existant"/>

                      <label>
                        <i className="far fa-question-circle"></i>
                        Avons-nous des produits qui pourraient vous intéresser ?</label>
                      <Field name="traitement_interet"/>
                      <ErrorMessage name="traitement_interet"/>

                      <label>
                        <i className="far fa-question-circle"></i>
                        Avez-vous un budget éventuel pour le traitement ?</label>
                      <Field name="budget"/>
                      <ErrorMessage name="budget"/>

                      <label>
                        <i className="far fa-question-circle"></i>
                        Quel traitement estimez-vous necessaire pour votre pièce?</label>
                      <Field component="select" name="traitement_type">
                        <option value="Aucune réponse">Selectionner votre choix</option>
                        <option value="Un traitement de départ, évolutif">
                          Un traitement de départ, évolutif
                        </option>
                        <option value="Un traitement de base, efficace">Un traitement de base, efficace</option>
                        <option value="Un traitement complet et optimisé">Un traitement complet et optimisé</option>
                      </Field>

                      <label>
                        <i className="far fa-question-circle"></i>
                        Souhaiteriez-vous une esthetique personnalisée à vos envies?</label>
                      <Field component="select" name="traitement_perso">
                        <option value="Aucune réponse">Selectionner votre choix</option>
                        <option value="Non, cela m'importe peu">Non, cela m'importe peu
                        </option>
                        <option value="Oui, l'esthetique est primordiale pour mon projet">Oui, l'esthetique est primordiale pour mon projet</option>
                      </Field>

                      <label>
                        <i className="far fa-question-circle"></i>
                        Avez-vous un message à nous partager ?</label>
                      <Field name="autres"/>
                      <ErrorMessage name="autres"/>

                      <button type="submit">Envoyer</button>
                    </Form></div>
                  : <div>{this.state.receptionMsg}</div>
              }

            </div>)
          }
        </Formik>

      </div>

    </div>)
  }
}

export default Questionnaire;
