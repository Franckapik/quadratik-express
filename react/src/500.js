import React, {Component} from 'react';
import logo from './logo_black.svg';


class InternalServerError extends Component {
  render() {
    return (
      <div className='center'>
      <img src={logo} alt='Logo 500' style={{width: 200, display: 'block', margin: 'auto', paddingTop :'100px'}}></img>
      <h1 >Erreur 500 - Erreur Interne du Serveur</h1>
      Nous sommes actuellement prévenu de cette erreur afin de remédier à cette situation technique.<p> Veuillez nous en excuser.</p>
      <a href='/' style={{color:'black'}}><h4>Retourner à l'accueil</h4></a>
      </div>

    );
  }
}

export default InternalServerError;
