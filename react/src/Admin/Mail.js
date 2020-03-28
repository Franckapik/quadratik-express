import React, {Component} from 'react';
import client from '../Store/client';

class Mail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suivi: null,
      reference: ""
    }
  }

  componentDidMount() {

  }

  getMail(id) {
    return client.confirmCommandeFetch(id)
    .then(ref => {
      this.setState({reference: ref})
      return ref.reference
    });
  }

  render() {

    const suivi = this.state.suivi;

    return (<div className="center">

      <h3>Envoi de mail</h3>

      {
        this.props.match.params.userid
          ? <div className="flex_c flex_w box_light1">
{this.props.match.params.userid}

<button onClick={() => this.getMail(this.props.match.params.userid)}>Mail de confirmation de commande -mailOrder</button>


Mail de confirmation de Paiement //mailPayment
Mail de commande prête //mailOrderReady
Mail d'expedition de commande //mailShipping
              </div>
              : 'aucun suivi disponible'
      }

    </div>)
  }
}

export default Mail;
