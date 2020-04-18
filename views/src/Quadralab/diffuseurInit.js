import peuplier from './textures/peuplier.jpg';

export default {
  rangee: 7,
  epaisseur: 0.003,
  largeurC: 0.068,
  largeurP: 0.100,
  nbCarreaux: new Array(49).fill(0).map((d, id) => ({id})),
  nbPeignes: new Array(12).fill(0).map((d, id) => ({id})),
  sequence: [ 3, 5, 2, 1, 2, 5, 3, 5, 0, 4, 3, 4, 0, 5, 2, 4, 1, 0, 1, 4, 2, 1, 3, 0, 6, 0, 3, 1, 2, 4, 1, 0, 1, 4, 2, 5, 0, 4, 3, 4, 0, 5, 3, 5, 2, 1, 2, 5, 3 ],
  couleur: "",
  nbcouleur : 0,
  bothSide: false,
  matiere: peuplier,
  matiereName: "Peuplier",
  accroche: true,
  logo : false,
  get longueurP() { return ((this.rangee * this.largeurC) + ((this.rangee - 1) * this.epaisseur)) },
  id : 0,
  qte : 1,
  nom : "Sur mesure",
  unite : 1,
  poids : 3
}
