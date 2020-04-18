import React, { Component } from 'react';
import '../styles/App.scss';
import homeStore from '../Store/homeStore'
import { view } from 'react-easy-state'
import Cgv from './Cgv';
import Mentions from './Mentions';
import Mail from './Mail';
import Newsletter from './Newsletter';
import Questionnaire from './Questionnaire';
import Menu from '../Menu';
import Etiquette from '../Admin/Etiquette';

class PanelInfo extends Component {
  render() {

    let sidewidth = {width : homeStore.width}
    return (
      <div className="slide" style={sidewidth}>
        <div
          className='close cursor'
          onClick={()=> {homeStore.width = 0;}}>
          <i className="fas fa-times">
          </i> Fermer
        </div>
        <div className=" flex_c">
        {homeStore.content === 'Cgv' ? <Cgv></Cgv> : null}
        {homeStore.content === 'Mentions' ? <Mentions></Mentions> : null}
        {homeStore.content === 'Mail' ? <Mail></Mail> : null}
        {homeStore.content === 'Newsletter' ? <Newsletter></Newsletter> : null}
        {homeStore.content === 'Questionnaire' ? <Questionnaire></Questionnaire> : null}
        {homeStore.content === 'Menu' ? <Menu></Menu> : null}
        {homeStore.content === 'Etiquette' ? <Etiquette></Etiquette> : null}
        </div>


      </div>

    )

  }
}

export default view(PanelInfo);
