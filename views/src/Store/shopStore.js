import {
  store
} from 'react-easy-state';
import client from './client';
import prix from '.././prix';

const panier = store({
  listeProduits: [],
  reduction: 0,
  domicile: false,
  cartid: 0,
  get unite() {
    if (panier.listeProduits.length > 0) {
      return panier.listeProduits.reduce((h, a) => {
        var i = panierOperations.infos.findIndex(x => x.id === a.id);
        if (i !== -1) {
          let unite = 0;
          if (a.unite) {
            unite = a.unite

          }
          else if (panierOperations.infos[i].unite) {
            unite = panierOperations.infos[i].unite

          }
          return h += a.qte * unite
        } else {
          return 0
        }
      }, 0);
    } else {
      return 0
    }
  },
  get hauteur() {
    return this.unite * 10
  },
  get poids() {
    return this.unite * 3
  },
  get nbColis() {
    return Math.ceil(this.hauteur / 40)
  },

  get qteTotale() {
    return panier.listeProduits.reduce((somme, i) => (somme += Number(i.qte)), 0);
  },

  get montantTotal() {
    return panier.montantHorsFdp + panier.fdp - (panier.montantHorsFdp * panier.reduction / 100);
  },

  get montantHorsFdp() {
    return panier.listeProduits.reduce((sum, i) => (sum += i.qte * i.prix), 0);
  },

  get fdp() {
    if (panier.domicile) {
      return panier.nbColis * 15
    } else {
      return 0
    }
  }
});

const panierOperations = store({
  infos: [],
  notification: [0, "hidden"],
  addToCart(id, qte, prix, nom, unite, poids) {
    let produit = {};
    var i = panier.listeProduits.findIndex(x => x.id === id);
    if (i === -1 || id === 0) {
      produit.id = id;
      produit.qte = qte;
      produit.prix = prix;
      produit.nom = nom;
      produit.unite = unite;
      produit.poids = poids;
      panier.listeProduits.push(produit);
    } else {
      panier.listeProduits[i].qte += qte;
    }
    panierOperations.notification = [150, "visible"];
    setTimeout(() => panierOperations.notification = [0, "hidden"], 3000);
    panierOperations.save();
  },

  removeFromCart(id, qte) {
    var i = panier.listeProduits.findIndex(x => x.id === id);
    if (panier.listeProduits[i] !== undefined && panier.listeProduits[i].qte > 1) {
      panier.listeProduits[i].qte--;
    } else {
      panier.listeProduits.splice(i, 1);
    }

    panierOperations.save();

  },

  deleteFromCart(id) {
    var i = panier.listeProduits.findIndex(x => x.id === id);
    panier.listeProduits.splice(i, 1);
    panierOperations.save();
  },

  save() {
    window.localStorage.setItem('panier', JSON.stringify(panier.listeProduits));
    window.localStorage.setItem('cartid', JSON.stringify(Number(new Date())));

  },

  resetCart() {
    panier.listeProduits = [];
    window.localStorage.setItem('panier', JSON.stringify(panier.listeProduits));

  },

  sendCartOnDB(admin, create) {
    client.saveCartPost(panier).then(res => {
      if (!admin && res.ok) {
        window.location = '/commande';
      } else if (admin) {
        return res
      } else {
        window.location = '/500';
      }
    });
  },

  getLocalCart() {
    if (localStorage.getItem('panier')) {
      panier.listeProduits = JSON.parse(localStorage.getItem('panier'));
      panier.cartid = JSON.parse(localStorage.getItem('cartid'));
    }
  },

  getReduction(code) {
    client.reductionfetch(code).then(data => {
      if (data.length !== 0) {
        panier.reduction = parseInt(data.reduction);
      }

    });
  },

  getProductInfo(id) {
    return panierOperations.infos.find(x => x.id === id);
  },

  showMiniPanier: false,
});


const prixStore = {
  matiere : 2,
  couleur : 10,
  couleurBack : 5,
  profondeur : 1,
  accroche : 0,
  logo : 0,
  marge : prix.marge,
  getPrix() {
    return (prixStore.matiere + prixStore.couleur + prixStore.couleurBack + prixStore.accroche + prixStore.logo + prixStore.marge) * prixStore.profondeur
  },
}

const produitSurMesure = {
  "id": 0,
  "nom": "Produit sur mesure",
  "prix": "-",
  "nbColors": "-",
  "collectionId": "-",
  "performance": 71,
  "packaging": 3,
  "src": "surmesure",
  "filter": "couleur",
  "top": null,
  "name": "Sur Mesure",
  "desc_collection": "",
  "folder": "SurMesure",
  "type": 71,
  "frequence": "-",
  "classement": "4",
  "graph": "[1,1,2,3 ,4 ,5 ,5 ,5 ,5 ,5 ,5 ,3 ,2 ,1 ,1, 1 ]",
  "desc_product": "Produit unique réalisé sur-mesure ",
  "prof": "-",
  "surface": "-",
  "taillecellule": "-",
  "longueur": "-",
  "largeur": "-",
  "nbpieces": "-",
  "nbcarreaux": "-",
  "nbcellules": "-",
  "unite": 0,
  "poids": 0,
  "nbcolors": 2,
  "prixcolors": 2.5,
}


client.getProductsFetch()
  .then(product => {
    product.product.push(produitSurMesure);
    panierOperations.infos = product.product;
  });


window.panier = panier;
window.panierOperations = panierOperations;
window.prixStore = prixStore;


export default panier;
export {
  panierOperations
};
export {
  prixStore
};
export {
  produitSurMesure
};
