import React, {Component} from 'react';
import FileSaver from 'file-saver';

class Facture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facture: null
    }
  }

  generateFacture(id) {
    fetch('/facture?sessid=' + id).then(response => response.json()).then(data => {
      this.setState({facture: data})
    });
  }

  getFacture(id) {
    fetch('/facture/getFacture?sessid=' + id).then(response => {
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
