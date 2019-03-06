import React from "react";
import Slider from "react-slick";

class SlideValeurs extends React.Component {
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 300,
      fade: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows:false
    };
    return (<div>
      <Slider {...settings}>
        <div className="case">
          <div className="flex_c">
            <span className="case_titre">Ecoute</span>
            <i className="fas fa-assistive-listening-systems"/>
            <span>
              Ligne directe avec l'Atelier
            </span>
          </div>

        </div>
        <div className="case">
                    <div className="flex_c">
          <span className="case_titre">Respect</span>
          <i className="fas fa-hands-helping"/>
          <span>
            Travail manuel du bois
          </span>        </div>
        </div>
        <div className="case  ">
                    <div className="flex_c">
          <span className="case_titre">Communauté</span>
          <i className="far fa-comments"/>
          <span>
            Echanges entre passionés
          </span>        </div>
        </div>
        <div className="case  ">
                    <div className="flex_c">
          <span className="case_titre">Certification</span>
          <i className="fas fa-check-circle"/>
          <span>
            Travaux de Schroeder
          </span>        </div>
        </div>
        <div className="case  ">
                    <div className="flex_c">
          <span className="case_titre">Sécurité</span>
          <i className="fas fa-lock"/>
          <span>
            Transaction en ligne sécurisée
          </span>        </div>
        </div>
        <div className="case  ">
                    <div className="flex_c">
          <span className="case_titre">
            Sur mesure
          </span>
          <i className="fas fa-arrows-alt-h"></i>
          <span>
            Personalisation selon votre studio
          </span>        </div>
        </div>
        <div className="case  ">
                    <div className="flex_c">
          <span className="case_titre">
            1000 Km max.
          </span>
          <i className="fas fa-truck"/>
          <span>
            Reductions du transport
          </span>
        </div>        </div>
        <div className="case ">
                    <div className="flex_c">
          <span className="case_titre">Emballage</span>
          <i className="fas fa-recycle"/>
          <span>Economie circulaire
          </span>        </div>
        </div>
      </Slider>
    </div>);
  }
}

export default SlideValeurs;
