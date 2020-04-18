import React, {Component} from 'react';
import {view} from 'react-easy-state';
import commandeStore from '../../Store/commandeStore';

class DepotColis extends Component {

  render() {
    const c = commandeStore.cotation;
    return (<div>
      <h3>Informations pratiques</h3>

      {
        c.offer
          ? <ul key={'cotation'}>
                  <li key={'op'} className="center"> {c.offer[0].operator[0].label[0]} </li>
                  <li key={'price'}> {c.offer[0].price[0]["tax-exclusive"]} € < /li>
                  <li key={'col'}>Dépot : {c.offer[0].collection[0].date}</li >
                  <li key={'del'}>Livraison : {c.offer[0].delivery[0].date}</li>
                  <li> { c.offer[0].characteristics[0].label.map((c, i) => { return (<p key={'label'}>{c}</p>) }) } </li>
                </ul>
          : null
      }
    </div>)
  }
}

export default view(DepotColis);
