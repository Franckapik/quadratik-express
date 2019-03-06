import React, {Component} from 'react';
import commandeStore from './commandeStore';
import {view} from 'react-easy-state';

class RecapEnregistrement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    };  }

  componentDidMount() {
    this.getUser();
  }


  getUser() {
    fetch('http://localhost:3005/getFromDB/user', {
      credentials: 'include',
      method: 'GET',
      mode: "cors"
    }).then(res => {
      return res.json();
    }).then(data => {
      this.setState({user: data[data.length -1]})
      console.log(data[data.length -1]);
    })
  }

  render() {
    console.log('user', this.state.user);
    return (<div>
{this.state.user?         <ul>
          {Object.keys(this.state.user).map((p, i) => {
            return (
              <li key={i}>
                {this.state.user[p]}
              </li>
            );
          })}
        </ul> : null}
</div>
    )

  }

}

export default view(RecapEnregistrement);
