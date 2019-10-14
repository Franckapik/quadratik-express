import React, {Component} from 'react';
import Collection from './Collection';
import shopStore from '../Store/shopStore';
import Panier from './Panier';
import Footer from '../Footer';
import Top from './Top';
import ScrollAnimation from 'react-animate-on-scroll';
import client from '../Store/client';

import {view} from 'react-easy-state';

class CollectionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      filtre: '',
      top: ''
    };


  }

  componentDidMount() {

    client.shopFetch()
    .then(data => {
      const collectionsObj = data[0].collections;
      this.setState({collections: collectionsObj});

      if(data[0].collections.length !== 0) {
        const top = data[0].collections.reduce(function(a, b) {
          return a.concat(b);
        }).filter(function(obj) {
          return obj.top !== null;
        });
        this.setState({top: top});
      } else {
        console.log("Top non valide");
      }
    });
  }

  render() {

    return (<div>{
        shopStore.showCart
          ? <Panier></Panier>
          : <div id="shop" className="flex_c style_light">
              <h1 className="boutique_title">> Boutique Quadratik</h1>
              <div >
                <ul className="flex_r filter">
                  <li onClick={() => this.setState({
                      filtre: 'couleur' | 'classique'
                    })}>Tous nos produits</li>
                    <li onClick={() => this.setState({filtre: 'couleur'})}>Les Diffuseurs Colorés</li>

                  <li onClick={() => this.setState({filtre: 'absorbeur'})}>
                    Les Absorbeurs</li>
                  <li onClick={() => this.setState({filtre: 'pack'})}>Les Packs</li>
                </ul>
              </div>
              {
                this.state.top && this.state.filtre == 0
                  ? <Top key="1" collectionid={this.state.top}/>
                  : null
              }

              {
                this.state.collections.filter((item => {
                  if (this.state.filtre) {
                    return item[0].filter === this.state.filtre;
                  } else {
                    return item
                  }
                })).map((c, i) => {
                  return (      <ScrollAnimation animateIn='fadeIn' animateOnce={true} className="mobile_hide">
                        <Collection key={i} collectionid={c}/>
                        </ScrollAnimation>);
                })
              }

            </div>
      }
      <Footer></Footer>
    </div>)

  }

}

export default view(CollectionsList);
