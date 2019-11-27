import React, {Component} from 'react';
import ReactDOM from "react-dom";

class Construction extends Component {

  getStyle(tag, property) {
    const node = ReactDOM.findDOMNode(this);
    if (node instanceof HTMLElement) {
      const child = node.querySelector(tag);

      if (child !== null) {
        return window.getComputedStyle(child)[property];
      } else {
        return '.'
      }
    }
  }

  render() {
    return (<div id="template">
      <h2>Modèle CSS</h2>
      <div className="flex_r flex_baseline ">
        <div className="flex_c fullsize ">
          <h3 className="accent">Titres</h3>
          <h1>Titre H1 {this.getStyle('h1', 'fontSize')}</h1>
          <h2>Titre H2 {this.getStyle('h2', 'fontSize')}</h2>
          <h3>Titre H3 {this.getStyle('h3', 'fontSize')}</h3>
          <h4>Titre H4 {this.getStyle('h4', 'fontSize')}</h4>
          <h5>Titre H5 {this.getStyle('h5', 'fontSize')}</h5>
          <h6>Titre H6 {this.getStyle('h6', 'fontSize')}</h6>
        </div>
        <div className="flex_c fullsize ">
          <h3 className="accent">Boutons</h3>
          <button>Base</button>
          <p>font-size : {this.getStyle('button', 'fontSize')}</p>
          <p>width : {this.getStyle('button', 'width')}</p>
          <p>height : {this.getStyle('button', 'height')}</p>

          <p></p>
          <p className="style_dark">
            <button className="button_dark">button_dark</button>
          </p>
          <p></p>

          <button className="button_light">button_light</button>
        </div>
        <div className="flex_c fullsize ">
          <h3 className="accent">Couleurs</h3>
          <div className="flex_r">
            <p>
              <p>
                <div className="circle dark"></div>
              </p>
              <p>dark {this.getStyle('.dark', 'backgroundColor')}</p>
              <div className="circle darklight"></div>
              <p>darklight {this.getStyle('.darklight', 'backgroundColor')}</p>
              <div className="circle whitedark"></div>
              <p>whitedark {this.getStyle('.whitedark', 'backgroundColor')}</p>
              <div className="circle whitedark0"></div>
              <p>whitedark0 {this.getStyle('.whitedark0', 'backgroundColor')}</p>
            </p>
            <p>
              <div className="circle main"></div>
              <p>main {this.getStyle('.main', 'backgroundColor')}</p>

              <div className="circle accent"></div>
              <p>accent {this.getStyle('.accent', 'backgroundColor')}</p>

              <div className="circle accent2"></div>
              <p>accent2 {this.getStyle('.accent2', 'backgroundColor')}</p>

              <div className="circle accent3"></div>
              <p>accent3 {this.getStyle('.accent3', 'backgroundColor')}</p>

              <div className="circle accent4"></div>
              <p>accent4 {this.getStyle('.accent4', 'backgroundColor')}</p>

            </p>
          </div>
        </div>

      </div>

      <div className="flex_r flex_baseline ">
        <div className="flex_c fullsize ">
          <h3 className="accent">Texte fond noir</h3>
          <div className="style_dark flex_c">
            <div>
              <p>Standard</p>
              <p>Font size {this.getStyle('.style_dark', 'fontSize')}
                | Line-Height {this.getStyle('.style_dark', 'lineHeight')}
                | Weight {this.getStyle('.style_dark', 'fontWeight')}
                | Family {this.getStyle('.style_dark', 'fontFamily')}</p>
              <p>Hanc regionem praestitutis
                <u>celebritati</u>
                diebus invadere
                <strong>parans dux ante edictus</strong>
                per solitudines
                <i>Aboraeque amnis</i>
                herbidas
                <em>ripas</em>, suorum indicio proditus, qui admissi flagitii metu exagitati ad praesidia descivere Romana. absque ullo egressus effectu deinde tabescebat immobilis.
              </p>

              <i>Aboraeque amnis</i>
              herbidas
              <em>ripas</em>, suorum indicio proditus, qui admissi flagitii metu exagitati ad praesidia descivere Romana. absque ullo egressus effectu deinde tabescebat immobilis.

            <a href="/lien.html">Suivez le lien</a>
          </div>

          <div className="texte1">
            <p>.Texte1</p>
            <p>Font size {this.getStyle('.texte1', 'fontSize')}
              | Line-Height {this.getStyle('.texte1', 'lineHeight')}
              | Weight {this.getStyle('.texte1', 'fontWeight')}
              | Family {this.getStyle('.texte1', 'fontFamily')}</p>
            <p>
              <i>Aboraeque amnis</i>
              herbidas
              <em>ripas</em>, suorum indicio proditus, qui admissi flagitii metu exagitati ad praesidia descivere Romana. absque ullo egressus effectu deinde tabescebat immobilis.
            </p>
            <i>Aboraeque amnis</i>
            herbidas
            <em>ripas</em>, suorum indicio proditus, qui admissi flagitii metu exagitati ad praesidia descivere Romana. absque ullo egressus effectu deinde tabescebat immobilis.

          <a href="/lien.html">Suivez le lien</a>
        </div>

        <div className="texte2">
          <p>.Texte2</p>
          <p>Font size {this.getStyle('.texte2', 'fontSize')}
            | Line-Height {this.getStyle('.texte2', 'lineHeight')}
            | Weight {this.getStyle('.texte2', 'fontWeight')}
            | Family {this.getStyle('.texte2', 'fontFamily')}</p>
          <p>
            <i>Aboraeque amnis</i>
            herbidas
            <em>ripas</em>, suorum indicio proditus, qui admissi flagitii metu exagitati ad praesidia descivere Romana. absque ullo egressus effectu deinde tabescebat immobilis.
          </p>
          <i>Aboraeque amnis</i>
          herbidas
          <em>ripas</em>, suorum indicio proditus, qui admissi flagitii metu exagitati ad praesidia descivere Romana. absque ullo egressus effectu deinde tabescebat immobilis.

        <a href="/lien.html">Suivez le lien</a>
      </div>
      </div>

    </div>
    <div className="flex_c fullsize ">
      <h3 className="accent">Texte fond clair</h3>
      <div className="style_light">
        <div>
          <p>Standard</p>
          <p>Font size {this.getStyle('.style_light', 'fontSize')}
            | Line-Height {this.getStyle('.style_light', 'lineHeight')}
            | Weight {this.getStyle('.style_light', 'fontWeight')}
            | Family {this.getStyle('.style_light', 'fontFamily')}</p>
          <p>Hanc regionem praestitutis
            <u>celebritati</u>
            diebus invadere
            <strong>parans dux ante edictus</strong>
            per solitudines
            <i>Aboraeque amnis</i>
            herbidas
            <em>ripas</em>, suorum indicio proditus, qui admissi flagitii metu exagitati ad praesidia descivere Romana. absque ullo egressus effectu deinde tabescebat immobilis.
          </p>

          <i>Aboraeque amnis</i>
          herbidas
          <em>ripas</em>, suorum indicio proditus, qui admissi flagitii metu exagitati ad praesidia descivere Romana. absque ullo egressus effectu deinde tabescebat immobilis.

        <a href="/lien.html">Suivez le lien</a>
      </div>

      <div className="texte1">
        <p>.Texte1</p>
        <p>Font size {this.getStyle('.texte1', 'fontSize')}
          | Line-Height {this.getStyle('.texte1', 'lineHeight')}
          | Weight {this.getStyle('.texte1', 'fontWeight')}
          | Family {this.getStyle('.texte1', 'fontFamily')}</p>
        <p>
          <i>Aboraeque amnis</i>
          herbidas
          <em>ripas</em>, suorum indicio proditus, qui admissi flagitii metu exagitati ad praesidia descivere Romana. absque ullo egressus effectu deinde tabescebat immobilis.
        </p>
        <i>Aboraeque amnis</i>
        herbidas
        <em>ripas</em>, suorum indicio proditus, qui admissi flagitii metu exagitati ad praesidia descivere Romana. absque ullo egressus effectu deinde tabescebat immobilis.

      <a href="/lien.html">Suivez le lien</a>
    </div>

    <div className="texte2">
      <p>.Texte2</p>
      <p>Font size {this.getStyle('.texte2', 'fontSize')}
        | Line-Height {this.getStyle('.texte2', 'lineHeight')}
        | Weight {this.getStyle('.texte2', 'fontWeight')}
        | Family {this.getStyle('.texte2', 'fontFamily')}</p>
      <p>
        <i>Aboraeque amnis</i>
        herbidas
        <em>ripas</em>, suorum indicio proditus, qui admissi flagitii metu exagitati ad praesidia descivere Romana. absque ullo egressus effectu deinde tabescebat immobilis.
      </p>
      <i>Aboraeque amnis</i>
      herbidas
      <em>ripas</em>, suorum indicio proditus, qui admissi flagitii metu exagitati ad praesidia descivere Romana. absque ullo egressus effectu deinde tabescebat immobilis.

    <a href="/lien.html">Suivez le lien</a>
  </div>

      </div>
    </div>
  </div>

  <div className="flex_r flex_baseline ">
    <div className="flex_c fullsize ">
      <h3 className="accent">Box Clair</h3>
      <div className="style_light">
        <div className="modele_box box_light1">
          <h4>box_light1</h4>Généralement, on utilise un texte en faux latin (le texte ne veut rien dire, il a été modifié), le Lorem ipsum ou Lipsum, qui permet donc de faire office de texte d'attente. L'avantage de le mettre en latin est que l'opérateur sait au premier coup d'oeil que la page contenant ces lignes n'est pas valide.</div>
        <div className="modele_box box_light2">
          <h4>box_light2</h4>Généralement, on utilise un texte en faux latin (le texte ne veut rien dire, il a été modifié), le Lorem ipsum ou Lipsum, qui permet donc de faire office de texte d'attente. L'avantage de le mettre en latin est que l'opérateur sait au premier coup d'oeil que la page contenant ces lignes n'est pas valide.</div>
        <div className="modele_box box_light3">
          <h4>box_light3</h4>Généralement, on utilise un texte en faux latin (le texte ne veut rien dire, il a été modifié), le Lorem ipsum ou Lipsum, qui permet donc de faire office de texte d'attente. L'avantage de le mettre en latin est que l'opérateur sait au premier coup d'oeil que la page contenant ces lignes n'est pas valide.</div>

      </div>
    </div>
    <div className="flex_c fullsize ">
      <h3 className="accent">Box Dark</h3>
      <div className="style_dark">
        <div className="modele_box box_dark1">
          <h4>box_dark1</h4>Généralement, on utilise un texte en faux latin (le texte ne veut rien dire, il a été modifié), le Lorem ipsum ou Lipsum, qui permet donc de faire office de texte d'attente. L'avantage de le mettre en latin est que l'opérateur sait au premier coup d'oeil que la page contenant ces lignes n'est pas valide.</div>

        <div className="modele_box box_dark2">
          <h4>box_dark2</h4>Généralement, on utilise un texte en faux latin (le texte ne veut rien dire, il a été modifié), le Lorem ipsum ou Lipsum, qui permet donc de faire office de texte d'attente. L'avantage de le mettre en latin est que l'opérateur sait au premier coup d'oeil que la page contenant ces lignes n'est pas valide.</div>
        <div className="modele_box box_dark3">
          <h4>box_dark3</h4>Généralement, on utilise un texte en faux latin (le texte ne veut rien dire, il a été modifié), le Lorem ipsum ou Lipsum, qui permet donc de faire office de texte d'attente. L'avantage de le mettre en latin est que l'opérateur sait au premier coup d'oeil que la page contenant ces lignes n'est pas valide.</div>

      </div>
    </div>

  </div>

  <div className="flex_c fullsize left ">
    <h3 className="accent">Formulaires</h3>
    <p>
      Texte input
      <p></p>
      <input value="Bienvenue sur Quadratik.fr"></input>
      <input value="Veuillez entrer un identifiant"></input>
    </p>
    <p>
      <div className="form-check">
        Input radio
        <input type="radio" name="react-tips" className="form-check-input" value="ici"/>
        <label>Choisissez moi!</label>
      </div>
    </p>
    <p>
      <select>
        <option value="volvo">Quadrablack</option>
        <option value="saab">Romal-7</option>

      </select>
    </p>
    <p>
      <button type="submit">Bouton submit</button>
    </p>
  </div>

</div>)
  }
}

export default Construction;
