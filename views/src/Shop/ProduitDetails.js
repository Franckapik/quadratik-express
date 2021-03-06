import React, {Component} from 'react';
import client from '../Store/client';
import ReactImageZoom from 'react-image-zoom';
import FileSaver from 'file-saver';
import {produitSurMesure} from '../Store/shopStore';



class ProduitDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      produit: false
    }
  }

  componentDidMount() {

    if (this.props.match.params.productsrc === 'surmesure') {
      console.log(produitSurMesure);
      this.setState({produit : [produitSurMesure]})
    } else {
      this.getProduit(this.props.match.params.productsrc);
    }
  }

  getProduit(src) {
    return client.getProductFetch(src).then(produit => {
      this.setState({produit: produit})
    });
  }

  getDataSheet(src, locale) {
    client.dataSheetFetch(src, locale)
    .then(response => {
      return response.blob();
    }).then(myBlob => {
      FileSaver.saveAs(myBlob, "DataSheet"+this.state.produit[0].src+".pdf");
    });
  }

  render() {
    const produit = this.state.produit[0];
    const props = {
      width: 550,
      zoomWidth: 500,
    };

    return (<div className="produit_details_container">
    <a href="/shop"><div className='close2 cursor' ><i className="fas fa-times"></i> Retourner en Boutique </div></a>
      {
        this.state.produit
          ? <div className="flex_c" style={{paddingTop:'3vw'}}>
              <div className = "flex_r flex_w" style={{justifyContent:'center', paddingBottom:'5vh'}}>
                <div className='produit_img_container w30'>
                  <ReactImageZoom {...props} img={"../images/modeles/" + produit.folder + "/" + produit.src + "-b.jpg"}/>
                </div>
                <div className=' box_light4 w30 givemespace' style={{height:'90%'}}>
                  <p > {produit.name} </p>
                  <p className='nom'> {produit.nom} </p>
                  <p className="prix"> {produit.prix} € </p>
                  <p className="style_light"> {produit.desc_product}{produit.desc_collection} </p>
                </div>
              </div>
              <div className='center'>
                <div className='caracteristiques'>
                  <div className="givemespace-hori flex_r">
                    <ul className="flex_c w50">
                    <li> <i className="fas fa-angle-right"></i> Type <span className="left"> {produit.filter} </span> </li>
                    <li> <i className="fas fa-tint"></i> Couleur <span className="left"> {produit.nbColors} </span> </li>
                    <li> <i className="fas fa-crop-alt"></i> Taille <span className="left"> {produit.unite > 1 ? <> { produit.unite } unités de {produit.largeur} x {produit.longueur } cm < /> : <> { produit.largeur } x { produit.longueur } cm < />}</span></li>
                    <li> <i className="fab fa-codepen"></i> Profondeur <span className="left"> {produit.prof} cm </span> </li>
                    <li> <i class="fas fa-sort-numeric-up-alt"></i> Nombre de cellules <span className="left"> {produit.nbcarreaux} </span> </li>
                    <li> <i className="fas fa-chart-bar"></i> Frequences <span className="left"> {produit.frequence} Hz </span> </li>
                    </ul>
                    <ul className="w50">
                    <li> <i className="fas fa-tree"></i> Matière <span className="left"> Peuplier </span> </li>
                    <li> <i class="fas fa-hammer"></i> Construction <span className="left"> A la main </span> </li>
                    <li> <i class="fab fa-confluence"></i> Fixation <span className="left"> Accroche intégrée </span> </li>
                    <li> <i class="fas fa-fill-drip"></i> Vernis <span className="left"> Non </span> </li>
                    <li> <i class="fas fa-globe-africa"></i> Origine <span className="left"> France </span> </li>
                    <li> <i className="fas fa-file-alt"></i> Documentation technique <span className="left cursor" onClick={() => this.getDataSheet(this.props.match.params.productsrc,'FR')}> Télécharger (FRANÇAIS) </span>
                      <span className="left cursor" onClick={() => this.getDataSheet(this.props.match.params.productsrc,'EN')}> Download (ENGLISH) </span></li>
                    </ul>

                  </div>
                </div>
              </div>
        </div>
          : null
      }
    </div>)
  }
}

export default ProduitDetails;
