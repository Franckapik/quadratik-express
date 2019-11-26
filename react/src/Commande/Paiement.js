import React, {Component} from 'react';
import '../styles/App.scss';
import {view} from 'react-easy-state';
import Braintree from './Braintree';

class Paiement extends Component {
  render() {
    return (<div>
        <Braintree></Braintree>
    </div>)
  }
}

export default view(Paiement);
