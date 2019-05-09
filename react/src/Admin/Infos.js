import React, {Component} from 'react';

class Infos extends Component {
  constructor(props) {
    super(props);
  }


  render() {
  return (
    <div>       <h2>Informations générales</h2>
          {
            this.props.info
              ? <div>
                  {
                    this.props.info.map((p, i) => {
                      return (
                          <ul key={i}>
                            <li key={'Info_nomentreprise' + i}>{p.nomentreprise}</li>
                            <li key={'Info_adresse' + i}>{p.adresse}</li>
                            <li key={'Info_siret' + i}>SIRET {p.siret}</li>
                            <li key={'Info_sirene' + i}>SIRENE {p.sirene}</li>
                            <li key={'Info_ape' + i}>APE {p.ape}</li>
                          </ul>
                    );
                    })
                  }
                </div>
              : null
          } </div>

)
}
}


export default Infos;
