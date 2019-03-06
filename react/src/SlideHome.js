import React from "react";
import Slider from "react-slick";

class SlideHome extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 300,
      fade: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true
    };
    return (<div>
      <Slider {...settings}>

        <div >
          <img className="slidehome_img" src="images/ampli-slide1.png" alt="Comprendre les atouts du diffuseur"/>
        </div>

        <div>

          <img className="slidehome_img" src="images/quadrablack-slide2.png" alt="Le Quadrablack est arrivé"/>

        </div>
        <a href="/shop">
          <div>

            <img className="slidehome_img" src="images/qualitebois-slide3.png" alt="Un bois encore plus résistant avec l'Okoumé"/>

          </div>
        </a>

      </Slider>
    </div>);
  }
}

export default SlideHome;
