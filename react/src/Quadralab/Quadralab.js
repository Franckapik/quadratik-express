import React, {Component} from 'react';
import '../App.scss';
import {init_app} from './B4W.js';
import {SketchPicker} from 'react-color';
import b4w from "blend4web";

const m_storage = b4w.storage;

class Quadralab extends Component {
  constructor() {
    super();
    this.state = {
      color: 'green'
    }

  }
  componentWillMount() {
    init_app();
    localStorage.clear();
  }

  componentDidMount() {}

  handleChange(color, event) {
    console.log(color.rgb);
    m_storage.set("couleur", [color.rgb.r, color.rgb.g, color.rgb.b, color.rgb.a])
  }

  render() {
    return (<div className="quadra_container">
      <div className="quadra_options">
        <span id="getAll" className="liens">
        <i className="fas fa-fill"></i> Tout remplir</span>
        <p></p>
        <span id="random" className="liens">
          <i className="fas fa-random"></i> Grand hasard</span>
        <p></p>
        <span id="pair" className="liens">
        <i className="fas fa-palette"></i>  Petit hasard</span>
        <p></p>
      </div>

      <SketchPicker color={this.state.color} className="picker" onChange={this.handleChange}/>

      <div className="b4w" id="b4w"></div>
      <div id="logo_container"></div>
      <div id="preloader_cont">
        <div id="prelod_static_path">
          <div id="prelod_dynamic_path"></div>
          <span></span>
        </div>
      </div>
    </div>);
  }
}

export default Quadralab;
