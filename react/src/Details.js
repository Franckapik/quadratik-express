import React, { Component } from 'react';
import './App.css';

class Details extends Component {
  render () {
    return (
      <div className="side">

        <p>

          {this.props.nom}
        </p>

        <p>

          {this.props.name}
        </p>

        <p>

          {this.props.frequence}
        </p>

        <p>

          {this.props.classement}
        </p>

        <p>

          {this.props.nbColors}
        </p>

        <p>

          {this.props.nbcellules}
        </p>

        <p>
          {this.props.longueur} x {this.props.largeur} cm
        </p>

        <p>
          {this.props.prof} cm
        </p>

        <p>
          Peuplier
        </p>

        <p>

          {this.props.packaging}
        </p>

        <p>
          '3 images'
        </p>

        <p>

          {this.props.desccollection}
        </p>

        <p>

          {this.props.descproduct}
        </p>


      </div>
    )
  }
}

export default Details;
