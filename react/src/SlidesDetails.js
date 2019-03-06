import React from "react";
import Slider from "react-slick";

class SlidesDetails extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 300,
      fade : true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: false
    };
    return (
      <div>
        <Slider {...settings}>
          <div><img  src={"images/modeles/"+this.props.name+"/"+this.props.nom+"b.jpg"} alt="essai" />
          </div>
          <div><img  src={"images/modeles/"+this.props.name+"/"+this.props.nom+"b.jpg"} alt="essai" />
          </div>
        </Slider>
      </div>
    );
  }
}

export default SlidesDetails;
