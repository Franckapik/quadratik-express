import React from 'react'
import SvgDif from './SvgDif'
import ScrollAnimation from 'react-animate-on-scroll';

export default function SectionPresentation() {
    return (
      <section id="presentation" className="flex_c style_dark">
      <div className=" flex_c center ">
        <h1>
          | 0<sub>1</sub> |
        </h1>
        <h2>
          Le diffuseur acoustique en <span className="letter_special">6</span> points
        </h2>
      </div>


      <div className="flex_r flex_w">
        <ScrollAnimation animateIn='bounceInLeft' animateOnce={true}>
        <div className="flex_c">
        <ul className="right">
          <li>
            <h3 className="list-titre">Redistribue le son</h3>
            <span className="list-number mobile_hide" id="num1">1</span>
            <p className="list-text">
              Homogénéité des ondes sonores dans la pièce.
            </p>
          </li>
          <li>
            <h3 className="list-titre">
              Améliore l'acoustique
            </h3>
            <span className="list-number mobile_hide" id="num2">2</span>
            <p className="list-text">
              Le phénomène de flutter echo est supprimé
            </p>
          </li>
          <li>
            <h3 className="list-titre">
              Entoure vos oreilles
            </h3>
            <span className="list-number mobile_hide" id="num3">3</span>
            <p className="list-text">
              Une impression de baigner dans le son
            </p>
          </li>
        </ul>
      </div>
      </ScrollAnimation>
      <ScrollAnimation animateIn='fadeIn' animateOnce={true} className="mobile_hide">
      <div className="flex_c">
        <SvgDif ></SvgDif>
      </div>
      </ScrollAnimation>
      <ScrollAnimation animateIn='bounceInRight' animateOnce={true}>
      <div className="flex_c">
        <ul className="left">
          <li>
            <span className="list-number mobile_hide" id="num4">4</span>
            <h3 className="list-titre">
              Clarifie vos mix
            </h3>
            <p className="list-text">
              Un son plus aéré, clair et précis
            </p>
          </li>
          <li>
            <span className="list-number mobile_hide" id="num5">5</span>
            <h3 className="list-titre">
              Agrandit votre pièce
          </h3>
            <p className="list-text">
              Une sensation de pièce plus grande
            </p>
          </li>
          <li>
            <span className="list-number mobile_hide" id="num6">6</span>
            <h3 className="list-titre">
              Apporte une esthetique
            </h3>
            <p className="list-text">
              Un décor de studio inspirant
            </p>
          </li>
        </ul>
      </div>
    </ScrollAnimation>
      </div>
      <div className="fullview center">
        <p className="mobile_hide">
          Pour comprendre tous les rôles du diffuseur acoustique
        </p>
        <a href="/guide">
          <button className="button_dark ">
            Suivez le Guide !
          </button>
        </a>
      </div>

    </section>
    )
}
