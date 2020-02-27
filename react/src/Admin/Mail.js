import React, {Component} from 'react';
import client from '../Store/client';

class Mail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: ""
    };
  }

  getMail(id) {
    client.confirmCommandeFetch(id)
    .then(res=> {
    })

  }

  render() {
    return (<> <i className = "fas fa-enveloppe cursor" onClick = {
     () => {
       this.getMail(this.props.id)
     }
   } > Confirmer la commande </i>
 {this.state.msg ? this.state.msg : null}
      </>)
  }
}

export default Mail;
