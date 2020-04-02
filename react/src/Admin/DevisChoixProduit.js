import React from 'react';
import '../styles/App.scss';
import {panierOperations} from '../Store/shopStore';

export default class ChoixProduit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.formData,
      id: 0,
      autre: false
    };
  }

  onChange(name) {
    return(event) => {
      const name = event.target.name;
      const value = event.target.value;

      if (name !== "id") {
        this.setState({
          [name]: value
        }, () => this.props.onChange(this.state))
      }

      if (name === "id") {
        if (value >= 0 && value < 37) {
          var i = panierOperations.infos.findIndex(x => x.id === Number(value));
          if (i !== -1) {
            this.setState({
              id: Number(value),
              prix: panierOperations.infos[i].prix,
              nom: panierOperations.infos[i].nom,
              unite: panierOperations.infos[i].unite,
              poids: panierOperations.infos[i].poids
            }, () => this.props.onChange(this.state))
          } else {
            this.setState({
              id: Number(value)
            }, () => this.props.onChange(this.state))
          }

        }

      }
    }

  }

  render() {
    const {
      id,
      qte,
      prix,
      nom,
      unite,
      poids
    } = this.state;
    return (
      <table className="listeProduits">
        <tr>
        <th>Id</th>
        <th>Qte</th>
        <th>Prix</th>
        <th>Nom</th>
        <th>Unité(s)</th>
        <th>Poids</th>
        <th>Sous-total</th>
      </tr>
        <tr>
          <td><input name="id" type="number" value={id} onChange={this.onChange("id")}/></td>
          <td><input name="qte" type="number" value={qte} onChange={this.onChange("qte")}/></td>
          <td><input name="prix" type="number" value={prix} onChange={this.onChange("prix")}/></td>
          <td><input name="nom" type="string" value={nom} onChange={this.onChange("nom")}/></td>
          <td><input name="unite" type="number" value={unite} onChange={this.onChange("unite")}/></td>
          <td><input name="poids" type="number" value={poids} onChange={this.onChange("poids")}/></td>
          <td>{qte * prix}</td>
        </tr>
      </table>);
  }
}
