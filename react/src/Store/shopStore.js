import {
  store
} from 'react-easy-state'

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
    var cart = JSON.stringify(this.cart);
    if (cart) {
      fetch('/saveInDB/savesessioncart', {
        credentials: 'include',
        method: 'post',
        mode: 'cors',
        body: cart,
        headers: new Headers({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      }).catch(error => {
        console.log(error)
      })
    }
  },

  resetCart() {
      fetch('/saveInDB/resetcart', {
        credentials: 'include',
        method: 'post',
        mode: 'cors',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      }).catch(error => {
        console.log(error)
      })
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
    console.log(body.hauteur, body.poids);
    if (body) {
      fetch('/saveInDB/saveCartOnDB', {
          credentials: 'include',
          method: 'post',
          mode: 'cors',
          body: JSON.stringify(body),
          headers: new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          })
        }).then(res => {
          return res.text();

        })
        .then(txt => {
          return JSON.parse(txt);
        })
        .then(data => {
          if(data.success) {
            console.log('Panier enregistré [', data.success[0],']');
            window.location = '/commande';
          } else {
            window.location ='/error' ;
          }

        });
    }

  },

  getSessionCart() {
    fetch('getFromDB/getsessioncart', {
        credentials: 'include',
        method: 'GET',
        mode: "cors" // no-cors, cors, *same-origin
      })
      .then(res => {
        return res.text();

      })
      .then(txt => {
        return JSON.parse(txt);
      })
      .then(data => {
        if (data.cart.length > 0) {
          shopStore.cart = data.cart;
        }
      });
  },

  getReduction(code) {
    fetch('getFromDB/getreduction?code=' + code, {
        credentials: 'include',
        method: 'GET',
        mode: "cors" // no-cors, cors, *same-origin
      })
      .then(res => {
        return res.text();

      })
      .then(txt => {
        return JSON.parse(txt);
      })
      .then(data => {
        if (data.length !== 0) {
          shopStore.reduction = parseInt(data[0].reduction);
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
