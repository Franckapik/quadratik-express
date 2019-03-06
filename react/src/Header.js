import React, {Component} from 'react';
import './App.css';
import shopStore from './shopStore';
import {view} from 'react-easy-state';
import auth0Client from './Auth';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHide: false
    };
    this.hideBar = this.hideBar.bind(this)

  }

  signOut = () => {
    auth0Client.signOut();
    window.location = "/";
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
    let classHide = this.state.isHide
      ? "hide"
      : ""
    return (<header className={classHide}>

      <nav>
        <ul>
          <li className="promo">
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
            <a href="/"><img src="images/logo_black.svg" alt="Logo Quadratik" className="logo_header"/></a>
          </li>
          <li>
            <a href="/quadralab">QuadraLab</a>
          </li>
          {
            window.location.pathname.split("/").pop() !== 'shop'
              ? <li className="boutique_header">
                  <a href="/shop">Boutique</a>
                </li>
              : null
          }
          {
            window.location.pathname.split("/").pop() === 'shop'
              ? <li>
                  <i className="cursor fas fa-shopping-cart" onClick={() => {
                      shopStore.showWidget = !shopStore.showWidget
                    }}>{
                      shopStore.cart.length > 0
                        ? <span className="headerCartnb">{shopStore.sumProduits}</span>
                        : null
                    }</i>
                </li>
              : null
          }

          <li>
            {!auth0Client.isAuthenticated() ? <i onClick={auth0Client.signIn} className="fas fa-sign-in-alt"></i> : null}
            {
              auth0Client.isAuthenticated() ? <div onClick={this.signOut}>
                  <label className="mr-2 text-white">Deconnexion </label>
                  <i className="cursor fas fa-sign-out-alt"></i>
                </div> : null
            }</li>
        </ul>

      </nav>
    </header>)

  }
}

export default view(Header);
