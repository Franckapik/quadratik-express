import React, {Component} from 'react';
import Collection from './Collection';
import shopStore from './shopStore';
import Panier from './Panier';
import Footer from './Footer';
import Top from './Top';

import {view} from 'react-easy-state';

class CollectionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      filtre: '',
      top:''
    };
  }

  componentDidMount() {
    fetch('/getFromDB/shopDB').then(response => response.json()).then(data => {
      const collectionsObj = data[0].collections.sort();
      this.setState({collections: collectionsObj});
      const top =  this.state.collections.reduce(function(a,b) { return a.concat(b);  })
       .filter(function(obj) { return obj.top !== null; });
     this.setState({top:top});
    });
  }

  render() {

    return (<div>{
        shopStore.showCart
          ? <Panier></Panier>
          : <div className="flex_c">
              <h1 className="boutique_title">Boutique Quadratik</h1>
              <div >
                <ul className="flex_r boutique_filter">
                  <li onClick={() => this.setState({
                      filtre: 'couleur' | 'classique'
                    })}>Tous nos produits</li>
                  <li onClick={() => this.setState({filtre: 'classique'})}>
                    Les diffuseurs Classiques</li>
                  <li onClick={() => this.setState({filtre: 'absorbeur'})}>
                    Les Absorbeurs</li>
                  <li onClick={() => this.setState({filtre: 'couleur'})}>Les Diffuseurs Colorés</li>
                  <li onClick={() => this.setState({filtre: 'pack'})}>Les Packs</li>
                </ul>
              </div>
{this.state.filtre === '' ? <Top key="1" collectionid={this.state.top} /> : null}

                {
                this.state.collections.filter((item => {
                  if (this.state.filtre) {
                    return item[0].filter === this.state.filtre;
                  } else {
                    return item
                  }
                })).map((c, i) => {
                  return (<Collection key={i} collectionid={c}/>);
                })
              }

            </div>
      }
      <Footer></Footer>
    </div>)

  }

}

export default view(CollectionsList);
