import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll';

export default function SectionQuadralab() {
  return (<section id="quadralab">

    <div className="flex_r fullsize style_dark flex_w">
      <ScrollAnimation animateIn='fadeIn'className="mobile_hide" animateOnce={true}>
        <div>
          <img className="quadra_background" src="images/quadrabg.png" alt="dessine ton diffuseur"/>
        </div>
      </ScrollAnimation>
      <div className=" flex_c center quadralab_title">
        <h1>
          | 0<sub>3</sub>
          |
        </h1>
        <h2>Quadra<span className="letter_special">L</span>ab: votre design en ligne</h2>
      </div>
      <ScrollAnimation animateIn='fadeIn' animateOnce={true}><img className="quadralab_diffuseur" src="images/diffuseur.svg" alt="dessine ton diffuseur"/>
  </ScrollAnimation>
    <div className="quadrabutton">
        <p>Creez un diffuseur acoustique aux couleurs de votre studio !</p>
        <a href="/QuadraLab">
          <button className="button_dark ">Dessiner son diffuseur</button>
        </a>
      </div>

    </div>
  </section>)
}
