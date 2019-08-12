import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll';

export default function SectionBoutique() {
  return (<section id="boutique">
    <div className="flex_r flex_wr boutique_container">
      <ScrollAnimation animateIn='bounceInRight' className="mobile_hide" animateOnce={true}>
        <span className="collection_title_home mobile_hide">
          Nouvelles collections
        </span>
        <div className="flex_r flex_w">

          <div className="boutique_box">

            <div className="rideau">
              <span className="rideau_text">
                <span className="rideau_title">
                  La simplicité
                </span>
                <ul>
                  <li>Discretion</li>
                  <li>Sérénité</li>
                  <li>Naturel</li>
                </ul>
              </span>
            </div>

            <h3 className="boutique_box_title">Botanik</h3>

            <img src="/images/modeles/Organik/Anemone-7c.png" alt="Collection Botanik" className="boutique_dif"/>

          </div>
          <div className="boutique_box">
            <div className="rideau">
              <span className="rideau_text">
                <span className="rideau_title">L'incontournable</span>
                <ul>
                  <li>Caractère</li>
                  <li>Robustesse</li>
                  <li>Epicé</li>
                </ul>
              </span>
            </div>
            <h3 className="boutique_box_title">Organik</h3>
            <img src="/images/modeles/Organik/Chene-7c.png" alt="Collection Organik" className="boutique_dif"/>
          </div>
          <div className="boutique_box">
            <div className="rideau">
              <span className="rideau_text">
                <span className="rideau_title">L'ambition</span>
                <ul>
                  <li>Minimaliste</li>
                  <li>Design</li>
                  <li>Fantaisie</li>
                </ul>
              </span>
            </div>
            <h3 className="boutique_box_title">Minimalik</h3>
            <img src="/images/modeles/Organik/Gruk-7c.png" alt="Collection Minimalik" className="boutique_dif"/>
          </div>
        </div>
      </ScrollAnimation>
      <div className="boutique_droite flex_c">
        <div className="section_title flex_c center">
          <h1>
            | 0<sub>2</sub>
            |
          </h1>
          <h2>
            <span className="letter_special">E</span>
            quiper votre studio!
          </h2>

        </div>
        <div className="boutique_promo flex_c">
          <p className="promo_title">Ca y est !</p>
          <div className="calendrier flex_c">
            <p>Absorbeurs de nouveau en stock!</p>
            <p className="nombre">Quadrablack</p>
          </div>
          <hr></hr>
          <h4>Envoyez-nous vos photos de studio et profitez d'une réduction de
            <strong>-5%</strong>
            sur vos prochaines commandes!
          </h4>
        </div>
        <a href="/shop">
          <button className="button_dot button_accent">
            La Boutique
          </button>
        </a>
      </div>
    </div>

  </section>)
}
