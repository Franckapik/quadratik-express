import React, {Component} from 'react';
import '../App.scss';
import auth0Client from './Auth';
import AdminRelais from './AdminRelais';
import Infos from './Infos';
import Clients from './Clients';
import Produits from './Produits';
import Construction from './Construction';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
      produits: false,
      essence: false,
      info: false,
      user_id: false,
      page:"clients"
    };
  }

  componentDidMount() {
    fetch('/getFromDB/adminData?user=' + auth0Client.getProfile().name).then(response => response.json()).then(adminData => {
      this.setState({user: adminData.user});
      this.setState({produits: adminData.product});
      this.setState({essence: adminData.essence});
      this.setState({info: adminData.info});
      this.setState({user_id: auth0Client.getProfile().name});
    });

    document.body.style.backgroundColor = "palegoldenrod"// Set the style

  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = event.target.name;

    this.setState({[name]: value});

  }

  render() {

  return (
<>
<h1>QuadrAdmin</h1>
Administrateur : {this.state.user_id}
  <div className="admin flex_r">
    <ul className="flex_c admin_menu">
    <li onClick={() => this.setState({page: "infos"})}>Informations Générales</li>
    <li onClick={() => this.setState({page: "relais"})}>Trouver un relais</li>
    <li onClick={() => this.setState({page: "clients"})}>Mes clients</li>
    <li onClick={() => this.setState({page: "produits"})}>Mes produits</li>
    <li onClick={() => this.setState({page: "construction"})}>Mes frais de construction</li>
    </ul>
    <div className="admin_main">
      {this.state.page==="infos" ?<Infos info={this.state.info}></Infos> : null}
      {this.state.page==="relais" ? <AdminRelais admin></AdminRelais> : null }
      {this.state.page==="clients" ? <Clients user={this.state.user}></Clients>: null }
      {this.state.page==="produits" ? <Produits produits={this.state.produits}></Produits>: null }
      {this.state.page==="construction" ? <Construction essence={this.state.essence}></Construction>: null }
    </div>
  </div>

  </>)

  }
}

export default Admin;
