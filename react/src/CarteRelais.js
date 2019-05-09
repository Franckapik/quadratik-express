import React from 'react'
import {Map as LeafletMap, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import {OpenStreetMapProvider} from 'leaflet-geosearch';

const provider = new OpenStreetMapProvider();

const iconPerson = new L.Icon({
  iconUrl: require('./carte/markerhome.svg'),
  iconSize: [
    60, 95
  ],
  iconAnchor: [
    22, 94
  ],
  popupAnchor: [-3, -76]
});

export {
  iconPerson
};

class CarteRelais extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [48, -1.7],
      geoloc: "Insérer l'adresse du domicile"
    };
  };

  componentDidMount() {
    this.geoSearch(this.props.center);
  }

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps.center !== this.props.center) {
      this.geoSearch(this.props.center)
    }
  }

  geoSearch(adresse) {
    provider.search({query: adresse})
    .then((result) => {
      if (result[0]) {
        this.setState({
          center: [parseFloat(result[0].y),parseFloat(result[0].x)],
          geoloc : "Géolocalisation du domicile : "+[parseFloat(result[0].y),parseFloat(result[0].x)]
        });

      } else {
        this.setState({
          geoloc: "Adresse non valide"
        });

      }

    });
  }

  render() {
    return (
      <div>
        {this.state.geoloc}
      <LeafletMap center={this.state.center} zoom={13} maxZoom={18} attributionControl={true} zoomControl={true} doubleClickZoom={true} scrollWheelZoom={true} dragging={true} animate={true} easeLinearity={0.35}>
      <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
      <Marker position={this.props.marker}>
        <Popup>
          Point relais
        </Popup>
      </Marker>
      <Marker position={this.state.center} icon={iconPerson}>
        <Popup>
          Domicile
        </Popup>
      </Marker>
    </LeafletMap>
    </div>
  );
  }
}

export default CarteRelais
