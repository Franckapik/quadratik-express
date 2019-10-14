import React from 'react'
import SlideValeurs from './SlideValeurs'
import ScrollAnimation from 'react-animate-on-scroll';

export default function SectionValeurs() {
  return (<section id="valeurs">
    <div className="flex_r flex_w style_dark fullsize">
      <ScrollAnimation animateIn="bounceInLeft" animateOnce={true}>
        <div className="valeurs_slidebox box_dark1">
          <div className="valeursbox_container center">
            <div className=" flex_c center valeurs_title  ">
              <h1>
                | 0<sub>4</sub>
                |
              </h1>
              <h2>
                Les
                <span className="letter_special">v</span>aleurs de l'Atelier
              </h2>
            </div>
            <SlideValeurs></SlideValeurs>
          </div>
        </div>
      </ScrollAnimation>

      <img className="valeurs_img_atelier center mobile_hide" src="images/Fab2.jpg" alt="Aperçu de l'espace de travail de l'atelier"/>

    <div className="valeurs_text"> <span className="mobile_hide">Un studio de musique est<br></br> un espace intime <br></br>où l'art et la création gouverne.
      L'esthétique et l’inspiration sont <br></br>des éléments essentiels <br></br> dans nos activités.<br></br>
    </span>  Nous sommes fiers<br></br> de proposer un matériel répondant <br></br> aux attentes des personnes passionées par le son,<br></br>  avec un respect du travail de l'artisan,<br></br>  de sa santé et de l’environnement.
  </div>
      </div>
  </section>)
}
