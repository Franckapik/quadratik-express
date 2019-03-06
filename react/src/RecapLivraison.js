import React, {Component} from 'react';
import commandeStore from './commandeStore';
import {view} from 'react-easy-state';

class RecapLivraison extends Component {
  constructor(props) {
    super(props);
    this.state = {
      livraison: ''
    };  }

  componentDidMount() {
    this.getLivraison();
  }


  getLivraison() {
    fetch('http://localhost:3005/getFromDB/livraison', {
      credentials: 'include',
      method: 'GET',
      mode: "cors"
    }).then(res => {
      return res.json();
    }).then(data => {
      this.setState({livraison: data[data.length -1]})
    })
  }

  render() {
    console.log('livraison', this.state.livraison);
    return (<div>
{this.state.livraison?         <ul>
          {Object.keys(this.state.livraison).map((p, i) => {
            return (
              <li key={i}>
                {this.state.livraison[p]}
              </li>
            );
          })}
        </ul> : null}
</div>
    )

  }

}

export default view(RecapLivraison);
