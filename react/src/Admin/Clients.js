import React, {Component} from 'react';
import SessionCart from './SessionCart';
import Sessionlivraison from './SessionLivraison';
import SessionPaiement from './SessionPaiement';
import SessionAdresse from './SessionAdresse';
import '../App.css';

class Clients extends Component {
  constructor(props) {
    super(props);
    this.state= {
      filterLast: 1,
      etiquette: null,
      message:null,
      facture:null
    }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  facture(id){
    fetch('/facture?sessid=' + id)
    .then(response => response.json())
    .then(data => {
      this.setState({facture: data})
    });
  }

  etiquette(id){
    fetch('/boxtal/etiquette?sessid=' + id)
    .then(response => response.json())
    .then(data => {
      this.setState({etiquette: data})
    });
  }

  handleChange(event) {
    var etiquette = {...this.state.etiquette}
    etiquette[event.target.name] = event.target.value;
    this.setState({etiquette})
  }


  handleSubmit(event) {
    this.orderEtiquette();
    event.preventDefault();
  }

  orderEtiquette() {
    const values = this.state.etiquette;
      fetch('/boxtal/order', {
        credentials: 'include',
        method: 'post',
        body: JSON.stringify(values),
        headers: new Headers({'Content-Type': 'application/json'})
      })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          console.log(res.error);
          this.setState({message : res.error.message[0]})
        } else {
          this.setState({message : res.order.shipment[0].reference[0]})

        }
      });

    }

  render() {
  return (
    <div>
    <h2>Mes clients</h2>
    {
      this.props.user
        ? <div>

        <ul className="flex_r admin_filter">
          <li className="cursor" onClick={() => this.setState({filterLast: this.props.user.length})}>Tous les clients</li>
          <li className="cursor" onClick={() => this.setState({filterLast: 20})}>
            20</li>
          <li className="cursor" onClick={() => this.setState({filterLast: 10})}>
            10</li>
          <li className="cursor" onClick={() => this.setState({filterLast: 5})}>5</li>
          <li className="cursor" onClick={() => this.setState({filterLast: 1})}>Dernier client</li>
        </ul>

            {
              this.props.user.sort(function(a, b) {
                return a.id - b.id
              }).slice(Math.max(this.props.user.length - this.state.filterLast, 0)).map((p, i) => {
                return (<div key={i}>
                  <h3 className="client_title">
                    <i className="fas fa-user"></i> <small>{p.id}</small> {p.prenom + ' ' + p.nom}
                    <i className="fas fa-file-pdf facture_i cursor" onClick={() => this.facture(p.userid)}></i>
                    <i className="fas fa-truck colis_i cursor" onClick={() => this.etiquette(p.userid)}></i>
                      <small>{p.userid}</small>
                    </h3>
                      {
                        this.state.etiquette
                          ? <div className="flex_r flex_w">                                              <form onSubmit={this.handleSubmit}>

                              {
                                Object.entries(this.state.etiquette).map((p, i) => {
                                  return (
                                          <p key={i}><label>{p[0]}:
                                              <input name={p[0]} value={p[1]} onChange={this.handleChange} />
                                            </label></p>
                                    );
                                })
                              }
                              <input type="submit" value="Régler la livraison"/>
                              {this.state.message}
                            </form>
                          </div>
                          : null
                      }
                  <div className="admin_list flex_r">
                    <SessionAdresse sessid={p.userid}></SessionAdresse>
                    <Sessionlivraison sessid={p.userid}></Sessionlivraison>
                    <SessionCart sessid={p.userid}></SessionCart>
                    <SessionPaiement sessid={p.userid}></SessionPaiement>
                  </div>
                </div>);
              })
            }
          </div>
        : 'Pas d\'utilisateur enregistré dans la base de donnée'
    }
</div>
)}}


export default Clients;
