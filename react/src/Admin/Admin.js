import React, {Component} from 'react';
import '../styles/App.scss';
import AdminRelais from './AdminRelais';
import Infos from './Infos';
import Clients from './Clients';
import Devis from './Devis';
import Produits from './Produits';
import Construction from './Construction';
import TemplateCSS from './TemplateCSS';
import client from '../Store/client';


class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
      produits: false,
      essence: false,
      info: false,
      page:"relais"
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
  <div className="flex_r flex_baseline admin">
    <ul className="flex_c admin_menu box_light1">
    <li onClick={() => this.setState({page: "infos"})}>Informations Générales</li>
    <li onClick={() => this.setState({page: "relais"})}>Trouver un relais</li>
    <li onClick={() => this.setState({page: "clients"})}>Mes clients</li>
    <li onClick={() => this.setState({page: "devis"})}>Devis/Facturation</li>
    <li onClick={() => this.setState({page: "produits"})}>Mes produits</li>
    <li onClick={() => this.setState({page: "construction"})}>Mes frais de construction</li>
    <li onClick={() => this.setState({page: "template"})}>Template CSS</li>
    </ul>
    <div className="contenu">
      {this.state.page==="infos" ?<Infos info={this.state.info}></Infos> : null}
      {this.state.page==="relais" ? <AdminRelais admin></AdminRelais> : null }
      {this.state.page==="clients" ? <Clients user={this.state.user} produits={this.state.produits}></Clients>: null }
      {this.state.page==="devis" ? <Devis user={this.state.user} produits={this.state.produits}></Devis>: null }
      {this.state.page==="produits" ? <Produits produits={this.state.produits}></Produits>: null }
      {this.state.page==="construction" ? <Construction essence={this.state.essence}></Construction>: null }
      {this.state.page==="template" ? <TemplateCSS></TemplateCSS>: null }
    </div>
  </div>

  </>)

  }
}

export default Admin;
