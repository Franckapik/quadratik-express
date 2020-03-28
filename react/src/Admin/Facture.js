import React, {Component} from 'react';
import FileSaver from 'file-saver';
import client from '../Store/client';

class Facture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facture: null
    }
  }

  generateFacture(id) {
    client.createFactureFetch(id)
    .then(data => {
      this.setState({facture: data})
    });
  }

  getFacture(id) {
    client.getFactureFetch(id)
    .then(response => {
      return response.blob();
    }).then(myBlob => {
      FileSaver.saveAs(myBlob, "FactureQuadratik" + this.state.facture + ".pdf");
    });
  }

  render() {
    return (<> < i className = "fas fa-file-pdf facture_i cursor" onClick = {
      () => {
        this.generateFacture(this.props.id)
      }
    } > Facture </i>
      {
      this.state.facture
        ? <div className="cursor" onClick={() => this.getFacture(this.props.id)}>
            Transaction n° {this.state.facture}
            <button>Télécharger</button>
          </div>
        : null
    } </>)
  }
}

export default Facture;
