import React, {Component} from 'react';
import Collection from './Collection';
import {panierOperations} from '../Store/shopStore';
import Footer from '../Footer';
import Top from './Top';
import ScrollAnimation from 'react-animate-on-scroll';
import client from '../Store/client';
import News from '../Home/News'


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

    panierOperations.getLocalCart();
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

      }
    });
  }

  render() {

    return (<div><div id="shop" className="flex_c style_light">
    <div className="flex_r box_dark3 givemespace infoShop"> <img src='./images/relaiscolis.gif' style={{width : '50px'}} className="givemespace"></img> <strong>Désormais la livraison est <span className="strongColor">GRATUITE</span> si vous choisissez de recevoir vos colis en <span className="strongColor">Point Relais</span> !</strong></div>
      <div className="width80 center"><News first="0" second="1" page='shop'></News></div>

              <h1 className="boutique_title">> Boutique Quadratik</h1>
              <div >
                <ul className="flex_r filter">
                  <li onClick={() => this.setState({
                      filtre: ''
                    })}>Tous les produits</li>
                    <li onClick={() => this.setState({filtre: 'couleur'})}>Les Diffuseurs Colorés</li>

                  <li onClick={() => this.setState({filtre: 'absorbeur'})}>
                    Les Absorbeurs</li>
                  <li onClick={() => this.setState({filtre: 'pack'})}>Les Packs</li>
                </ul>
              </div>
              {
                this.state.top && this.state.filtre === 0
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
                })).reverse().map((c, i) => {
                  return (      <ScrollAnimation animateIn='fadeIn' animateOnce={true}>
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
