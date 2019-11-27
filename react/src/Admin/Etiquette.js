import React, {Component} from 'react';
import client from '../Store/client';

class Etiquette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      etiquette: null,
      message: null,
      sidewidth: {
        width: 0
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

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

  changeWidth(size) {
    this.setState({
      sidewidth: {
        width: size
      }
    })


  }

  createEtiquette(id) {
    client.createEtiquetteFetch(id).then(data => {
      this.setState({
        etiquette: data,
        sidewidth: {
          width: 500
        }
      })
    });
  }

  orderEtiquette(id) {
    const values = this.state.etiquette;
    fetch('/boxtal/order/'+id, {
      credentials: 'include',
      method: 'post',
      body: JSON.stringify(values),
      headers: new Headers({'Content-Type': 'application/json'})
    }).then(res => res.json()).then(res => {
      if (res.error) {
        console.log(res.error);
        this.setState({message: res.error.message[0]})
      } else {
        this.setState({message: res.order.shipment[0].reference[0]})
      }
    });
  }

  render() {
    return (<div>

      <i className="fas fa-truck cursor" onClick={() =>
          this.createEtiquette(this.props.id)
        }> Expedition</i>
      <div className="flex_r flex_w " style={this.state.sidewidth}>
        <div className='slide_close cursor' onClick={() => this.changeWidth(0)}>
          <i className="fas fa-times"></i>
          Fermer
        </div>
        {
          this.state.etiquette
            ? <form onSubmit={this.handleSubmit}>
                {
                  Object.entries(this.state.etiquette).map((p, i) => {
                    return (<p key={i}>
                      <label>{p[0]}:
                        <input name={p[0]} value={p[1]} onChange={this.handleChange}/>
                      </label>
                    </p>);
                  })
                }
                <button type="submit" > Régler la livraison</button> {this.state.message}
              </form>
            : null
        }
      </div>
    </div>)
  }
}

export default Etiquette;
