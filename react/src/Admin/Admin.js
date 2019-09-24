import React, {Component} from 'react';
import '../App.scss';
import AdminRelais from './AdminRelais';
import Infos from './Infos';
import Clients from './Clients';
import Produits from './Produits';
import Construction from './Construction';
import client from '../Store/client';


class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
      produits: false,
      essence: false,
      info: false,
      page:"clients"
    };
  }

  componentDidMount() {
    client.adminFetch()
    .then(adminData => {
      this.setState({user: adminData.user});
      this.setState({produits: adminData.product});
      this.setState({essence: adminData.essence});
      this.setState({info: adminData.info});
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
