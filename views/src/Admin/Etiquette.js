import React, {Component} from 'react';
import client from '../Store/client';

class Etiquette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      etiquette: null,
      message: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createEtiquette = this.createEtiquette.bind(this);
  }

  componentDidMount() {
    console.log(this.props.match.params.userid);
    this.createEtiquette(this.props.match.params.userid)
  }

  handleChange(event) {
    var etiquette = {
      ...this.state.etiquette
    }
    etiquette[event.target.name] = event.target.value;
    this.setState({etiquette})
  }

  handleSubmit(event) {
    this.orderEtiquette(this.props.id);
    event.preventDefault();
  }

  createEtiquette(id) {
    client.createEtiquetteFetch(id).then(data => {
      this.setState({etiquette: data})
    });
  }

  orderEtiquette(id) {
    const values = this.state.etiquette;
    fetch('/boxtal/order/' + id, {
      credentials: 'include',
      method: 'post',
      body: JSON.stringify(values),
      headers: new Headers({'Content-Type': 'application/json'})
    }).then(res => res.json()).then(res => {
      console.log(res);
      if (res.message) {
        this.setState({message: res.message[0]})
      } else {
        this.setState({message: res.order.shipment[0].reference[0]})
      }
    });
  }

  render() {
    return (<div className="fullsize">
      {
        this.state.etiquette
          ? <form className = "center" onSubmit={this.handleSubmit}>
              {
                Object.entries(this.state.etiquette).map((p, i) => {
                  return (<p key={i}>
                    <label>{p[0]}:
                      <input name={p[0]} value={p[1]} onChange={this.handleChange}/>
                    </label>
                  </p>);
                })
              }
              <button type="submit">
                Régler la livraison</button>
              {this.state.message}
            </form>
          : null
      }
    </div>)
  }
}

export default Etiquette;
