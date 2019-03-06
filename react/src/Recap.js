import React, { Component } from 'react';
import './App.css';
import commandeStore from './commandeStore';
import {view} from 'react-easy-state';
import Cart from './Cart';

class Recap extends Component {


  render() {
      let recap = commandeStore.recap;
    return (
          <div className='commande_recap_container'>
            <Cart></Cart>
            {recap ?
<div>
  <ul>
  {Object.keys(recap).map((c, i) => {
    return (
      <li key={i}> {recap[c]}</li>
    );

  })}
  </ul>
</div>


            : null

        }
          </div>

    )
  }
}

export default view(Recap);
