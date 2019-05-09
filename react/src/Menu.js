import React, {Component} from 'react';

class Menu extends Component {

  render() {
    return (
      <div className="menu">
        <ul>
          <li><a href="/">Accueil</a></li>
          <li><a href="/guide"> Guide </a></li>
          <li><a href="/quadralab">QuadraLab</a></li>
          <li><a href="/shop">Boutique</a></li>
          <li className="promo"><a href="https://www.facebook.com/Quadratikfr-528507077617370"><i className="fab fa-facebook"></i></a><a href="https://twitter.com/QuadratikF"><i className="fab fa-twitter-square"></i></a> <i className="fab fa-instagram"></i></li>

        </ul>
      </div>
    )

  }

}

export default Menu;
