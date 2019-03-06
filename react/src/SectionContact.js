import React from 'react'
import homeStore from './homeStore'

export default function SectionContact() {
  return (<section id="contact">
    <div className="contact_container flex_c">
      <div className="section_title flex_c center">
        <h1>
          | 0<sub>5</sub>
          |
        </h1>
        <h2>Parlez-nous de votre
          <span className="letter_special">S</span>tudio</h2>
        <p className="contact_text mobile_hide">Communiquez-nous votre projet et discutons de vos envies!
        </p>
      </div>
      <div id='flexcanvas'>
        <div id="container" class="flexChild rowParent">

          <div class="flexChild rowParent">
            <div className="e2 e1 flexChild selected mobile_hide cursor">
              <h6>Réseaux sociaux</h6>
              <hr></hr>
              <span className="e_gros">Twitter</span>
            </div>

            <div class="flexChild columnParent">
              <div class="e2 flexChild cursor">
                <h6>Téléphone</h6>
                <hr></hr>
                <p className="e_box">
                  <span className="e_gros">06 31 92 74 81</span>
                  <br></br>
                  <br></br>
                  <span>Ligne directe Atelier</span>
                </p>
              </div>

              <div class="flexChild columnParent">
                <div class="e2 flexChild cursor">
                  <h6>Mail</h6>
                  <hr></hr>
                  <p className="e_box" onClick={() => {
                      homeStore.width = '100%';
                      homeStore.content = 'Mail';
                    }}>
                    <i className="far fa-envelope"></i>
                    <br></br>Ecrivez-nous !</p>
                </div>

              </div>
            </div>
          </div>

          <div class="flexChild columnParent">
            <div class="flexChild rowParent">
              <div class="e2 flexChild mobile_hide cursor">
                <h6>Newsletter</h6>
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

              <div class="e2 flexChild mobile_hide cursor">
                <h6>Votre studio</h6>
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

            <div class="e2 flexChild">
              <h6>Atelier</h6>
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
      </div>
    </div>

  </section>)
}
