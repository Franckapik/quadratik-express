import React, { Component } from 'react';
import '../styles/App.scss';


class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state= {
      sidewidth: {
        width : 0
      }
    }
  }

  render() {
    return (
      <div className="" style={this.props.sidewidth}>
        <div
          className='slide_close cursor'
          onClick={()=> {this.setState({sidewidth : 0})}}>
          <i className="fas fa-times">
          </i> Fermer
        </div>
        <div className=" flex_c">
        {this.props.content === 'Cgv' ? 'CGV' : null}
        </div>


      </div>

    )

  }
}

export default PopUp;
