import React, {Component} from 'react';
import client from '../../Store/client';
import {view} from 'react-easy-state';

class Relais extends Component {
  constructor(props) {
    super(props);
    this.state = {
      relais: null,
      showHoraires: false,
    };
  }

  componentDidMount() {
    this.getRelaisInfo(this.props.code)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.code !== this.props.code) {
      this.getRelaisInfo(this.props.code)
    }
  }

  getRelaisInfo(pickup_code) {
    client.relaisFetch(pickup_code)
    .then(data => {
      this.setState({relais: data.pickup_point});
    });
  }

  render() {

    var relaisColor = {
      backgroundColor: 'white'
    }

    if (this.props.relaisSelected === this.state.relais) {
		relaisColor = {
			backgroundColor: 'crimson'
		}
	}

    return (
      <div>
      {
        this.state.relais
          ? <ul key='relais' className="relais_box box_light1 givemespace" style={relaisColor} onClick={() => {this.props.setRelais(this.state.relais)}}>
              <li><h4>{this.state.relais.name[0]}</h4></li>
              <li>{this.state.relais.address[0]}</li>
              <li>
                {this.state.relais.zipcode[0]} &nbsp;
                {this.state.relais.city[0]} &nbsp;
                {this.state.relais.country[0]}</li>
              <li></li>
              <li onClick={() => {
                  this.setState({showHoraires: !this.state.showHoraires})
                }}><u className="cursor center"><i className="fas fa-arrow-circle-down"></i>  Horaires</u></li>
              {
                this.state.showHoraires
                  ? <li>{
                        this.state.relais.schedule[0].day.map((p, i) => {
                          let semaine = [
                            "Dimanche",
                            "Lundi",
                            "Mardi",
                            "Mercredi",
                            "Jeudi",
                            "Vendredi",
                            "Samedi"
                          ];
                          return (<ul key={'schedule' + i} className="flex_r horaires box_light1 ">
                            <li key={'semaine' + i}>{semaine[p.weekday[0]]}</li>
                            <li key={'am' + i}>{p.open_am[0]}
                              - {p.close_am[0]}</li>
                            <li key={'pm' + i}>{p.open_pm[0]}
                              - {p.close_pm[0]}</li>
                          </ul>)
                        })
                      }</li>
                  : null
              }
            </ul>
          : null
      }
    </div>)
  }
}

export default view(Relais);
