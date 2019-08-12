import React, { Component } from 'react';
import SlideHome from './SlideHome'
import SectionPresentation from './SectionPresentation'
import SectionBoutique from './SectionBoutique'
import SectionQuadralab from './SectionQuadralab'
import SectionValeurs from './SectionValeurs'
import SectionContact from './SectionContact'
import Footer from '../Footer'

import { view } from 'react-easy-state'

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
  return (<div>
<section className="mobile_hide">
      <SlideHome></SlideHome>
    </section>
    <SectionPresentation></SectionPresentation>
<SectionBoutique></SectionBoutique>
   <SectionQuadralab></SectionQuadralab>
    <SectionValeurs></SectionValeurs>
     <SectionContact></SectionContact>
      <Footer></Footer>

  </div>)
}
}

export default view(Home);
