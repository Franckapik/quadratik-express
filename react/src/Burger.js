import React, {Component} from 'react';
import homeStore from './homeStore'

  class Burger extends Component {

    render() {
      return (
        <div><i className="fas fa-bars cursor burger" onClick={() => {
            homeStore.width = '100%';
            homeStore.content = 'Menu';
          }}></i></div>
      )

    }

  }


export default Burger;
