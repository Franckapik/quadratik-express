import React, {useState} from 'react';
import {SketchPicker} from 'react-color';
import Canvas3D from './Canvas3D';
import ordinaire from './textures/ordinaire.jpg';
import peuplier from './textures/peuplier.jpg';
import okoume from './textures/okoume.jpg';
import blanc from './textures/blanc.jpg';
import mdf from './textures/mdf.jpg';
import souscouche from './textures/souscouche.jpg';
import '../styles/App.scss';
import {prixStore, panierOperations} from '../Store/shopStore';
import {view} from 'react-easy-state';
import prix from '.././prix';
import { useHistory } from 'react-router-dom';
import diffuseurInit from './diffuseurInit';

const Grid = (props) => {
  return ( <>
  <div className="center titre_box">{props.titre}</div>
  {props.tab === "couleur" ? <div className="center">{props.option}</div> : null }
  <div className="flex_c">
    <div className="flex_r flex_w">
      {props.elements.map((a, i) => {
        return (
          <div className="box_quadralab">{a}</div>
        )
      })}
    </div>
  </div>
</>)
}

const setPrice = (key, value) => {
  console.log( prix[key][value]);
    prixStore[key] = prix[key][value];
}

const Quadralab = (props) => {
  let history = useHistory()
  const [diffuseur, setDiffuseur] = useState(diffuseurInit);
  const [previousMat, setpreviousMat] = useState();
  const [tab, setTab] = useState("matiere");
  const [qte, setQte] = useState(1);

  const profondeur= () => { return (diffuseur.sequence.map((a, i) => { return a * (diffuseur.largeurP / Math.max(...diffuseur.sequence)) })) };

  window.profondeur = profondeur;

  const Validate = (id, qte, prix, name, unite, poids) => {
  panierOperations.addToCart(id, qte, prix, name, unite, poids);
  }

  const changeDif = React.useCallback((update) => {
    setDiffuseur(previous => ({
      ...previous,
      ...typeof update === 'function' ? update(previous) : update
    }));
  }, []);

//prix initial
  prixStore["matiere"] = prix["matiere"][diffuseur.matiereName];
  prixStore["profondeur"] = prix["profondeur"][diffuseur.largeurP];
  prixStore["couleur"] = prix["couleur"][diffuseur.nbcouleur];
  prixStore["couleurBack"] = prix["couleurBack"][diffuseur.bothSide];
  prixStore["accroche"] = prix["accroche"][diffuseur.accroche];
  prixStore["logo"] = prix["logo"][diffuseur.logo];

//profondeurs

  const largeur100 = <div onClick={() => {changeDif({largeurP: 0.100}); setPrice("profondeur", 0.100)}} className="flex_c cursor"><span className="letterSize center">S</span><span>Classique / 10cm</span></div> ;
  const largeur150 = <div onClick={() => {changeDif({largeurP: 0.150}); setPrice("profondeur", 0.150)}} className="flex_c cursor"><span className="letterSize center">M</span><span>Intermédiaire / 15cm</span></div> ;
  const largeur200 = <div onClick={() => {changeDif({largeurP: 0.200}); setPrice("profondeur", 0.200)}} className="flex_c cursor"><span className="letterSize center">L</span><span>The Big One / 20cm</span></div> ;

//couleurs
  const C_aucune = <div onClick={() => {changeDif({couleur : "white", nbcouleur: 0, matiere: previousMat}); setPrice("couleur", 0)}} className="flex_c cursor"><span className="letterSize center"><i className="fas fa-times"></i></span><span>Aucune</span></div> ;
  const C_noir = <div onClick={() => {changeDif({couleur : "black", nbcouleur: 1, matiere: previousMat}); setPrice("couleur", 1)}} className="flex_c cursor"><span className="letterSize center noir"></span><span>Noir</span></div> ;
  const C_blanc = <div onClick={() => {changeDif({couleur : "white", nbcouleur: 1, matiere: blanc, matiereName: "Blanc"}); setPrice("couleur", 1);}} className="flex_c cursor"><span className="letterSize center"></span><span>Blanc</span></div> ;
  const C_souscouche = <div onClick={() => {changeDif({couleur : "white", nbcouleur: 4, matiere: souscouche, matiereName: "Souscouche"}); setPrice("couleur", 4)}} className="flex_c cursor"><span className="letterSize center souscouche"></span><span>Sous-couche</span></div> ;
  const C_perso = <div onClick={() => {setTab("couleurPerso"); setPrice("couleur", 3);}} className="flex_c cursor"><span className="letterSize center"><img alt="colorWheel" src="././images/color-wheel.svg" width="50px"></img></span><span>Personnalisée</span></div> ;
  const C_bothside = <div><input type="radio" value="option1" checked={diffuseur.bothSide} onClick={()=> {changeDif({bothSide : !diffuseur.bothSide, couleurArriere: "white"}); setPrice("couleurBack", diffuseur.bothSide);}} />Peinture sur l'arrière du diffuseur</div>;

//matieres
  const M_mdf = <div onClick={() => {changeDif({matiere: mdf, matiereName: "Fibre de bois"}); setPrice("matiere", "mdf")}} className="flex_c cursor"><span className="letterSize center mdf"></span><span>Fibre de bois</span></div> ;
  const M_okoume = <div onClick={() => {changeDif({matiere: okoume, matiereName: "Okoume"}); setPrice("matiere", "okoume")}}  className="flex_c cursor"><span className="letterSize center okoume"></span><span>Okoume</span></div> ;
  const M_peuplier=<div onClick={() => {changeDif({matiere: peuplier, matiereName: "Peuplier"}); setPrice("matiere", "peuplier")}}  className="flex_c cursor"><span className="letterSize center peuplier"></span><span>Peuplier</span></div> ;
  const M_ordinaire=<div onClick={() => {changeDif({matiere: ordinaire, matiereName: "Contreplaqué"}); setPrice("matiere", "contreplaque")}}  className="flex_c cursor"><span className="letterSize center ordinaire"></span><span>Contreplaqué</span></div> ;

//options
  const O_accroche=<div onClick={() => {changeDif({accroche: !diffuseur.accroche}); setPrice("accroche", diffuseur.accroche)}} className="flex_c cursor"><span className="letterSize center"><img alt="Ajout de l'accroche" src="././images/hook.svg" width="50px"></img></span><span>{diffuseur.accroche? "Accroche au mur ajoutée" :  "Aucune accroche murale" }</span></div> ;
  const L_logo=<div onClick={() => {changeDif({logo: !diffuseur.logo}); setPrice("logo", diffuseur.logo)}} className="flex_c cursor"><span className="letterSize center"><img alt="Ajout du logo" src="././images/user.svg" width="50px"></img></span><span>{diffuseur.logo? "Logo ajouté" :  "Aucun logo ajouté" }</span></div> ;

//rendu
  return (<div id="quadralab" className="flex_r fullsize ">
  <span className="back cursor"  onClick={() => history.goBack()} ><i className="fas fa-angle-left"></i> retour</span>
    <div className="w60 megafull flex_c">
      <Canvas3D dif = {diffuseur} profondeur={profondeur()}></Canvas3D>
      <div className="priceBox w15">
        <p>Diffuseur {diffuseur.matiereName} {diffuseur.couleur} de {diffuseur.largeurP * 100} cm</p>
        <p>{prixStore.getPrix()} €</p>
        <div className="flex_r flex_center">
        <button onClick={() => Validate(0, qte, prixStore.getPrix(), 'Sur Mesure', 1, 3)}>Ajouter au panier</button>
        <input className="givemespace" type="text" value={qte} size="2"/>
          <div className="flex_c"><i className="fas fa-plus cursor" onClick={()=> setQte(qte+1)}></i>
          <i className="fas fa-minus cursor" onClick={()=> setQte(qte-1)}></i></div>
        </div>
    </div>
  </div>
    <div className="w40 megafull flex_c quadraparam">
      <div className="flex_r">
        <i className="fas fa-cubes quadricon" onClick={() => setTab("matiere")}></i>
        <i className="fas fa-paint-brush quadricon" onClick={() => {setTab("couleur"); setpreviousMat(diffuseur.matiere)}}></i>
        <i className="fas fa-expand quadricon" onClick={() => setTab("profondeur")} ></i>
        <i className="fas fa-screwdriver quadricon" onClick={() => setTab("options")}></i>
        <i className="far fa-address-card quadricon" onClick={() => setTab("logo")}></i>
      </div>
      {tab === "matiere" ?
<Grid tab={tab} titre="Selectionner le bois" elements={[M_mdf, M_okoume, M_peuplier, M_ordinaire]}></Grid>
        : null}
      {tab === "couleur" ?
<Grid tab={tab} option={C_bothside} titre="Selectionner une couleur" elements={[C_aucune, C_souscouche, C_noir, C_blanc, C_perso, ""]}></Grid>
        : null}
      {tab === "couleurPerso" ?
        <div>
          <div className="center titre_box">Couleur personnalisée</div>
            <p className="cursor" onClick={() => setTab("couleur")}>Retour</p>
              <div className="flex_r">
                <div>Une seule couleur</div>
                <div>Peinture par cellule</div>
              </div>
              <SketchPicker color={diffuseur.couleur} onChange={(color) => changeDif({couleur : color.hex, nbcouleur: 3})}/>
        </div>
        : null}
      {tab === "profondeur" ?
<Grid tab={tab} titre="Selectionner une profondeur" elements={[largeur100, largeur150, largeur200, ""]}></Grid>
        : null}
      {tab === "options" ?
<Grid tab={tab} titre="Ajouter des éléments supplémentaires" elements={[O_accroche,"" ]}></Grid>
        : null}
      {tab === "logo" ?
<Grid tab={tab} titre="Ajouter votre logo" elements={[L_logo,"" ]}></Grid>
        : null}
    </div>
  </div>)
}



export default view(Quadralab);
