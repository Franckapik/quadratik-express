import React, {Component} from 'react';

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
    this.orderEtiquette();
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
    fetch('/boxtal/etiquette?sessid=' + id).then(response => response.json()).then(data => {
      this.setState({
        etiquette: data,
        sidewidth: {
          width: 500
        }
      })
    });
  }

  orderEtiquette() {
    const values = this.state.etiquette;
    fetch('/boxtal/order', {
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
      <i className="fas fa-truck colis_i cursor" onClick={() => {
          this.createEtiquette(this.props.id);
        }}> Expedition</i>
      <div className="flex_r flex_w slide" style={this.state.sidewidth}>
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
                <input type="submit" value="Régler la livraison"/> {this.state.message}
              </form>
            : null
        }
      </div>
    </div>)
  }
}

export default Etiquette;
