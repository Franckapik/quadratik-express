import React, {Component} from 'react';
import SlideHome from './SlideHome'
import SectionPresentation from './SectionPresentation'
import SectionBoutique from './SectionBoutique'
import SectionQuadralab from './SectionQuadralab'
import SectionValeurs from './SectionValeurs'
import SectionContact from './SectionContact'
import SectionLogo from './SectionLogo'
import Footer from '../Footer'
import client from '../Store/client';

import {view} from 'react-easy-state'

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      news: []
    };
  }

  componentWillMount() {
    client.newsFetch("home").then(data => {
      this.setState({news: data})
      console.log(data);
    });
  }

  render() {
    return (<div>
      <SectionLogo></SectionLogo>
      <section className="mobile_hide">
        <SlideHome></SlideHome>
      </section>
      <SectionPresentation></SectionPresentation>
      <SectionBoutique news={this.state.news[0]}></SectionBoutique>
      <SectionQuadralab></SectionQuadralab>
      <SectionValeurs></SectionValeurs>
      <SectionContact></SectionContact>
      <Footer></Footer>

    </div>)
  }
}

export default view(Home);
