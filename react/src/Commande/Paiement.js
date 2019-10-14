import React, {Component} from 'react';
import '../styles/App.scss';
import {view} from 'react-easy-state';
import Braintree from './Braintree';

class Paiement extends Component {
  render() {
    return (<div>

      <div>
        <h1>Paiement</h1>
        <Braintree></Braintree>
      </div>

    </div>)
  }
}

export default view(Paiement);
