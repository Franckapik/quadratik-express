import React, {Component} from 'react';
import './styles/App.scss';
import panier, {panierOperations} from './Store/shopStore';
import {view} from 'react-easy-state';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHide: false
    };
    this.hideBar = this.hideBar.bind(this)

  }

  hideBar() {
    let {isHide} = this.state
    window.scrollY > this.prev
      ? !isHide && this.setState({isHide: true})
      : isHide && this.setState({isHide: false})

    this.prev = window.scrollY;
  }
  componentDidMount() {
    window.addEventListener('scroll', this.hideBar);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.hideBar);
  }

  render() {
    let classHide = this.state.isHide ? "hide" : "" ;
    if (window.location.pathname.split("/").pop().includes('quadralab')) {
      return null
    } else {
      return (<header className={classHide}>

        <nav>
          <ul className="flex_r">
            <li className="reseaux_icones">
              <a href="https://www.facebook.com/Quadratikfr-528507077617370">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://twitter.com/QuadratikF">
                <i className="fab fa-twitter-square"></i>
              </a>
              <i className="fab fa-instagram"></i>
            </li>
            <li>
              <a href="/">Accueil</a>
            </li>
            <li>
              <a href="/guide">
                Guide
              </a>
            </li>
            <li>
              <a href="/"><img src="https://www.quadratik.fr/images/logo/logo_cercle.svg" alt="Logo Quadratik"/></a>
            </li>
            <li>
              <a href="/quadralab">QuadraLab</a>
            </li>
            {
              window.location.pathname.split("/").pop() === 'shop' ||
              window.location.pathname.split("/").pop().includes('produit')
                ?
            <li className="cursor" onClick={()=> {panierOperations.showMiniPanier = !panierOperations.showMiniPanier}}>
                    <i className="cursor fas fa-shopping-cart">{
                        panier.listeProduits
                          ? <span className="headerCartnb">{panier.qteTotale}</span>
                          : null
                      }</i>
                  </li>
                  : <li className="boutique_header">
                  <a href="/shop">Boutique</a>
                </li>
            }
            <li>
              <a href='/admin'>
                <i className="fas fa-user"></i>
              </a>
            </li>
          </ul>

        </nav>
      </header>)

    }

  }
}

export default view(Header);
