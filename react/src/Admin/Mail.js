import React, {Component} from 'react';
import client from '../Store/client';

class Mail extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (<> < i className = "fas fa-file-pdf cursor" onClick = {
     () => {
       client.confirmCommandeFetch(this.props.id)
     }
   } > Mail de confirmation </i>
      </>)
  }
}

export default Mail;
