const prix = {
  matiere: {
    "Fibre de bois": 20, //10
    "Peuplier": 27,
    "Okoume": 38,
    "Contreplaqué": 15,
    "Souscouche": 10
  },
  couleur: {
    0: 0,
    1: 3,
    2: 6,
    3: 15,
    4: 12
  },
  profondeur: {
    0.100: 1,
    0.150: 1.8,
    0.200: 3
  },
  accroche: {
    false : 0,
    true : 4
  },
  couleurBack: {
    false: 0,
    true: 12
  },
  logo: {
    false : 0,
    true : 4
  },
  marge: 30

};

module.exports = prix;
