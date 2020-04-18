import React, {Component} from 'react';
import logo from './logo_black.svg';


class NotFoundPage extends Component {
  render() {
    return (
      <div className='center'>
      <img src={logo} alt='Logo 404' style={{width: 200, display: 'block', margin: 'auto',  paddingTop :'100px' }}></img>
      <h1 >Erreur 404 - Page non trouvée</h1>
      <a href='/' style={{color:'black'}}><h4>Retourner à l'accueil</h4></a>
      </div>

    );
  }
}

export default NotFoundPage;
