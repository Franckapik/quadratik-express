import React from 'react'
import '../styles/App.scss';
import ScrollAnimation from 'react-animate-on-scroll';

const SectionLogo = (props) => {
  return (<section id="sectionlogo" className="desktop_hide">
    <div className="flex_c flex_nw flex_center style_dark fullsize">
      <img src="images/logo/logo_cercle.svg" alt="Logo Quadratik" className="logo_mobile"/>
      <h2>Quadratik.fr</h2>

        <ScrollAnimation
          animateIn='bounce'
          initiallyVisible={false}
          delay='4000'
          animateOut='bounceOutUp'
          >

          <i className="fas fa-angle-double-down arrow_mobile"></i>
        </ScrollAnimation>

    </div>



  </section>)
}

export default SectionLogo;
