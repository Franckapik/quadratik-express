import React, { Component } from 'react';
import '../App.scss';
import shopStore from '../Store/shopStore'
import { view } from 'react-easy-state'
import ReactImageMagnify from 'react-image-magnify';

class PanelDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: ''
    };
  }

  render() {

    let sidewidth = {width : shopStore.width}
    let content = shopStore.selected

    return (
      <div className="slide" style={sidewidth}>
        <div
          className='slide_close cursor'
          onClick={()=> {shopStore.width = 0;}}>
          <i className="fas fa-times">
          </i> Fermer
        </div>
        { shopStore.showDetails ?
          <div className='slide_container flex_r flex_w'>

            <div className='slideG'>
              <div className ="slide_piclist flex_c" >
                <img
                  className ="slide_img_small"
                  src={"images/modeles/"+content.name+"/"+content.src+"-b.jpg"}
                  alt=""
                  onClick={() => {
                    this.setState({view : '-b'})
                  }} />
                <img
                  className ="slide_img_small"
                  src={"images/modeles/"+content.name+"/"+content.src+"-c.jpg"}
                  alt=""
                  onClick={() => {
                    console.log("images/modeles/"+content.name+"/"+content.src+"-c.jpg");
                    this.setState({view : '-c'})
                  }}/>
                  <img
                    className ="slide_img_small"
                    src={"images/modeles/"+content.name+"/"+content.src+".png"}
                    alt=""
                    onClick={() => {
                      this.setState({view : ''})
                    }}/>

              </div>

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
                }} />

              </div>
              <div className='slideD flex_c center'>
                <div className='slideD_box'>
                  <p className='slideD_col'>
                    {content.name}
                  </p>
                  <h5 className='slideD_nom'>
                    {content.nom}
                  </h5>

                  <p className="slideD_product_desc">
                    {content.descproduct}{content.desccollection}
                  </p>

                  <p className='slideD_caracteristiques'>
                    <i className="fas fa-tint">
                    </i> Couleur <span>
                    {content.nbColors}
                  </span>
                </p>

                <p className='slideD_caracteristiques'>
                  <i className="fab fa-codepen">
                  </i> Taille <span>
                  {content.longueur} x  {content.largeur} cm
                </span>
              </p>

              <p className='slideD_caracteristiques'>
                <i className="fas fa-chart-bar">
                </i> Frequences <span>
                {content.frequence} Hz
              </span>
            </p>

            <p className='slideD_caracteristiques'>
              <i className="fa fa-tree">
              </i> Matière <span>Peuplier</span>
            </p>

            <p className='slideD_cart flex_r'>
              <span className="price">
                {content.prix} € (+ {content.packaging} € de frais de port)
              </span>
            </p>

            </div>

          </div>
        </div>

        : null }

      </div>

    )

  }
}

export default view(PanelDetails);
