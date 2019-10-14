import React, {Component} from 'react';
import '../styles/App.scss';
import shopStore from '../Store/shopStore'
import {view} from 'react-easy-state'
import ReactImageMagnify from 'react-image-magnify';

class PanelDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: ''
    };
  }

  render() {

    let sidewidth = {
      width: shopStore.width
    }
    let content = shopStore.selected

    return (<div className="slide" style={sidewidth}>
      <div className='close cursor' onClick={() => {
          shopStore.width = 0;
        }}>
        <i className="fas fa-times"></i>
        Fermer
      </div>
      {
        shopStore.showDetails
          ? <div className=' flex_r flex_w'>

              <div className='slideG w60'>
                <ul className="flex_c">
                  <li><img src={"images/modeles/" + content.name + "/" + content.src + "-b.jpg"} alt="" onClick={() => {
                this.setState({view: '-b'})
              }}/></li>
                  <li><img src={"images/modeles/" + content.name + "/" + content.src + "-c.jpg"} alt="" onClick={() => {
                console.log("images/modeles/" + content.name + "/" + content.src + "-c.jpg");
                this.setState({view: '-c'})
              }}/></li>
                  <li>
                    <img src={"images/modeles/" + content.name + "/" + content.src + ".png"} alt="" onClick={() => {
                        this.setState({view: ''})
                      }}/></li>

                </ul>

                <ReactImageMagnify className="mobile_hide" {...{
                  smallImage: {
                    alt: "Affichage du modèle "+content.nom+" non disponible",
                    src: "images/modeles/"+content.name+"/"+content.src+this.state.view+".jpg",
                    width: 800,
                    height: 550

                  },
                  largeImage: {
                    src: "images/modeles/"+content.name+"/"+content.src+".jpg",
                    width: 1920,
                    height: 1080
                  },
                }}/>

              </div>
              <div className='flex_c center'>
                <div className='slideD_box box_light4'>
                  <p > {content.name} </p>
                  <h5 className='nom'> {content.nom} </h5>
                  <p className="style_light"> {content.descproduct}{content.desccollection} </p>
                  <ul className="givemespace-hori">
                    <li>
                      <i className="fas fa-tint"></i>
                      Couleur
                      <span>
                        {content.nbColors}
                      </span>
                    </li>
                    <li>
                      <i className="fas fa-codepen"></i>
                      Taille
                      <span>
                        {content.longueur}
                        x {content.largeur}
                      </span>
                    </li>
                    <li>
                      <i className="fas fa-chart-bar"></i>
                      Frequences
                      <span>
                        {content.frequence}
                        Hz
                      </span>
                    </li>
                    <li>
                      <i className="fas fa-tree"></i>
                      Matière
                      <span>
                        Peuplier
                      </span>
                    </li>
                  </ul>
                  <p className="center"> {content.prix} € (+ {content.packaging} € de frais de port) </p>

                </div>

              </div>
            </div>

          : null
      }

    </div>)

  }
}

export default view(PanelDetails);
