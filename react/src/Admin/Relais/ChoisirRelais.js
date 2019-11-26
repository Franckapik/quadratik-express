import React, {Component} from 'react';
import {view} from 'react-easy-state';
import commandeStore from '../../Store/commandeStore';
import Relais from './Relais';

class ChoisirRelais extends Component {

  constructor(props) {
    super(props);
    this.state = {
      relais_selected: ''
    };

    this.setRelaisSelected = this.setRelaisSelected.bind(this);
  }

  componentDidMount() {}

  setRelaisSelected(relais) {
    this.setState(
      {relais_selected: relais}
    );
    commandeStore.relais_selected = relais;
  }

  render() {
    const c = commandeStore.cotation;
    return (<div>
      <h3>Relais disponibles</h3>
      {
        c.offer
          ? <>
            {
              c.offer.map((p, i) => {
                const relaislist= p.mandatory_informations[0].parameter[13].type[0].enum[0].value;
                return (
                  relaislist
                    ? <ul key={'par' + i}>
                      {
                        relaislist.map((p, i) => {
                          return (<li key={'enum' + i} className="center">
                            <Relais code={p} setRelais={this.setRelaisSelected} relaisSelected={this.state.relais_selected}></Relais>
                          </li>)
                        })
                      }
                      </ul>
                  : 'Aucun relais trouvé'
                )
              })
            }

            </>

        : "Aucune offre n'est disponible"
      }
    </div>)
  }
}

export default view(ChoisirRelais);
