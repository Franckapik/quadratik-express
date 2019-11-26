import React from 'react'
import homeStore from '../Store/homeStore'

export default function SectionContact() {
  return (<section id="contact">
    <div className="style_light flex_c fullsize">
      <div className=" flex_c center">
        <h1>
          | 0<sub>5</sub>
          |
        </h1>
        <h2>Parlez-nous de votre
          <span className="letter_special">S</span>tudio</h2>
        <p className="contact_text mobile_hide">Communiquez-nous votre projet et discutons de vos envies!
        </p>
      </div>
      <div className="box_light1 flex_r fullsize flex_baseline ">
        <div className="box_light1 flex_c ">

          <div className="box_dark4 cursor contact_box center givemespace ">
            <h3>Téléphone</h3>
            <hr></hr>
            <p className="e_box">
              <span className="e_gros">06 31 92 74 81</span>
              <br></br>
              <br></br>
              <span>Ligne directe Atelier</span>
            </p>
          </div>

          <div className="box_dark4  cursor contact_box center givemespace">
            <h3>Mail</h3>
            <hr></hr>
            <p className="e_box" onClick={() => {
                homeStore.width = '100%';
                homeStore.content = 'Mail';
              }}>
              <i className="far fa-envelope"></i>
              <br></br>Ecrivez-nous !</p>
          </div>

        </div>

        <div className="box_light1 flex_c ">
          <div className="box_dark4 mobile_hide cursor contact_box center givemespace">
            <h3>Newsletter</h3>
            <hr></hr>
            <p className="e_box" onClick={() => {
                homeStore.width = '100%';
                homeStore.content = 'Newsletter';
              }}>
              <i className="far fa-newspaper"></i>
              <br></br>Les astuces en acoustique
              <br></br>
              en un seul mail mensuel</p>
          </div>

          <div className="box_dark4 mobile_hide cursor contact_box center givemespace">
            <h3>Votre studio</h3>
            <hr></hr>
            <p className="e_box" onClick={() => {
                homeStore.width = '100%';
                homeStore.content = 'Questionnaire';
              }}>
              <i className="fab fa-wpforms"></i>
              <br></br>
              Decrivez-nous votre situation</p>
          </div>

        </div>
        <div className="box_dark4 contact_box center givemespace">
          <h3>Atelier</h3>
          <hr></hr>
          <p className="e_box">
            Entreprise Quadratik.fr
            <br></br>
            <strong>SIRET 83529797900014</strong>
            <br></br>
            <br></br>
            Adresse postale
            <br></br>Rue d'Aubigné 35440 Feins</p>
        </div>
      </div>
    </div>

  </section>)
}
