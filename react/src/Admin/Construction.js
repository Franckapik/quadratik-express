import React, {Component} from 'react';

class Construction extends Component {
  render() {
  return (
    <div>       <h2>Mes Frais de construction</h2>
    {
      this.props.essence
        ? <div>

            {
              this.props.essence.map((p, i) => {
                return (<div key={i}>
                  <div className="">
                    <ul>
                      <li key={'Essence_essence' + i}>{p.essence}</li>
                      <li key={'Essence_prixessence' + i}>Prix au m2: {p.prixessence} €</li>
                      <li key={'Essence_prixessenceclient' + i}>Prix facturé au m2: {p.prixessenceclient} €</li>
                      <li key={'Essence_poidsessencem2' + i}>Poids au m2: {p.poidsessencem2} kg</li>

</ul>
                  </div>
                </div>);
              })
            }
          </div>
        : null
    } </div>

)
}
}


export default Construction;
