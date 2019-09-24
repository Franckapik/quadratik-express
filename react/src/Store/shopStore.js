import {
  store
} from 'react-easy-state'

import client from './client';


const shopStore = store({
  showDetails: false,
  showWidget: false,
  showCart: false,
  width: 0,
  height: 0,
  selected: null,
  cart: [],
  enregistrement: null,
  reduction: 0,
  get total() {
    shopStore.sendSessionCart();
    return this.somme + this.fdp - (this.somme * shopStore.reduction /100);

  },
  get somme() {
    if (this.cart.length > 0) {
      return shopStore.cart.reduce((sum, i) => (
        sum += i.qte * i.produit.prix
      ), 0);
    } else {
      return 0
    }

  },
  get sumProduits() {
    return shopStore.cart.reduce((sum, i) => (
      sum += i.qte
    ), 0);

  },
  get fdp() {
    if (this.cart.length > 0) {
      return shopStore.cart.reduce((sum, i) => (
        sum += i.qte * i.produit.packaging
      ), 0);
    } else {
      return 0
    }

  },

  get hauteur(){
    if (this.cart.length > 0) {
      return shopStore.cart.reduce((h, i) => (
        h += i.qte * i.produit.unite * 10
      ), 0);
    } else {
      return 0
    }
  },

  get poids(){
    if (this.cart.length > 0) {
      return shopStore.cart.reduce((h, i) => (
        h += i.qte * i.produit.unite * i.produit.poids
      ), 0);
    } else {
      return 0
    }
  },

  get unite(){
    if (this.cart.length > 0) {
      return shopStore.cart.reduce((h, i) => (
        h += i.qte * i.produit.unite
      ), 0);
    } else {
      return 0
    }
  },


  lessCart() {
    var i = shopStore.cart.findIndex(x => x.produit.nom === this);
    if (shopStore.cart[i].qte > 1) {
      shopStore.cart[i].qte--;
      shopStore.sendSessionCart();
    } else {
      shopStore.cart.splice(i, 1);
      shopStore.sendSessionCart();
    }
  },

  plusCart() {
    var i = shopStore.cart.findIndex(x => x.produit.nom === this);
    shopStore.cart[i].qte++;
    shopStore.sendSessionCart();
  },

  addToCart() {
    let produit = {};
    produit.produit = this.props;
    var i = shopStore.cart.findIndex(x => x.produit.nom === this.props.nom)
    if (i === -1) {
      produit.qte = this.state.value;
      shopStore.cart.push(produit);

    } else {
      shopStore.cart[i].qte = shopStore.cart[i].qte + Number(this.state.value);
    }

    shopStore.height = 120;
    setTimeout(() => shopStore.height = 0, 3000);
    shopStore.sendSessionCart();


  },

  sendSessionCart() {
    if (this.cart) {
      client.cartsessionPost(this.cart);
    }
  },

  resetCart() {
    client.resetCartPost();
  },

  sendCartOnDB() {
    const body = {
      cart: shopStore.cart,
      qte: shopStore.sumProduits,
      fdp: shopStore.fdp,
      reduction: shopStore.reduction,
      total: shopStore.total,
      hauteur: shopStore.hauteur,
      poids: shopStore.poids,
      unites: shopStore.unite
    };
    if (body) {
      client.saveCartPost(body)
        .then(res => {
          console.log(res);
          if(res.ok) {
            window.location = '/commande';
          } else {
            window.location ='/500' ;
          }

        });
    }

  },

  getSessionCart() {
    client.cartsessionFetch()
      .then(data => {
        if (data.cart.length > 0) {
          shopStore.cart = data.cart;
        }
      });
  },

  getReduction(code) {
    client.reductionfetch(code)
      .then(data => {
        if (data.length !== 0) {
          shopStore.reduction = parseInt(data.reduction);
        }

      });
  },

  removeFromCart() {
    var i = shopStore.cart.findIndex(x => x.produit.nom === this);
    shopStore.cart.splice(i, 1);
    shopStore.sendSessionCart();

  }
})



export default store(shopStore);
