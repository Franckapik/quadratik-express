var express = require('express');
var router = express.Router();
var cors = require('cors');
const environment = process.env.NODE_ENV || 'development'; // if something else isn't setting ENV, use development
const configuration = require('../config')[environment]; // require environment's settings from knexfile
const knex = require('knex')(configuration);
const logger = require('../log/logger');
// Query Database

orderQuery = (sessid) => {
  return knex('user')
    .where('userid', sessid)
    .then(user => {
      user.length ? logger.debug("[Etiquette] Utilisateur retrouvé: %o", user[0].id) :
        logger.warn("[Etiquette] Utilisateur manquant");
      knex('cart')
        .where('userid', sessid)
        .then(cart => {
          cart.length ? logger.debug("[Etiquette] Panier retrouvé: %o", cart[0].id) :
            logger.warn("[Etiquette] Panier manquant");
          knex('commande')
            .where('userid', sessid)
            .then(commande => {
              commande.length ? logger.debug("[Etiquette] Commande retrouvée: %o", commande[0].id) :
                logger.warn("[Etiquette] Commande manquante");
              knex('livraison')
                .where('userid', sessid)
                .then(livraison => {
                  livraison.length ? logger.debug("[Etiquette] livraison retrouvée: %o", livraison[0].id) :
                    logger.warn("[Etiquette] Livraison manquante");

                  const order = {
                    user: user[user.length - 1],
                    livraison: livraison[livraison.length - 1],
                    cart: cart,
                    commande: commande[commande.length - 1]
                  };

                  return order

                })
            })
        })
    })
    .catch(error => logger.error(error));

};

userQuery = (sessid) => {
  return knex('user')
    .where('userid', sessid)
    .then(user => {
      user.length ? logger.debug('[Knex] Données Utilisateur chargées (id): %s', user[user.length - 1].id) : logger.warn('[Knex] Données Utilisateur manquantes (sessid): %s', sessid);
      return user[user.length - 1]
    }).catch(error => logger.error('[Knex] User Query error: %s', error));
};

cartQuery = (sessid) => {
  return knex('cart')
    .where('userid', sessid)
    .then(cart => {
      cart.length ? logger.debug('[Knex] Données Panier chargées (id): %s', cart[cart.length - 1].id) : logger.warn('[Knex] Données Panier manquantes (sessid): %s', sessid);
      return cart
    }).catch(error => logger.error('[Knex] Cart Query error: %s', error));
}

livraisonQuery = (sessid) => {
  return knex('livraison')
    .where('userid', sessid)
    .then(livraison => {
      livraison.length ? logger.debug('[Knex] Données Livraison chargées (id): %s', livraison[livraison.length - 1].id) : logger.warn('[Knex] Données Livraison manquantes (sessid): %s', sessid);
      return livraison[livraison.length - 1]
    }).catch(error => logger.error('[Knex] Livraison Query error: %s', error));
}

commandeQuery = (sessid) => {
  return knex('commande')
    .where('userid', sessid)
    .then(commande => {
      commande.length ? logger.debug('[Knex] Données Commande chargées (id): %s', commande[commande.length - 1].id) : logger.warn('[Knex] Données Commande manquantes (sessid): %s', sessid);
      return commande[commande.length - 1]
    }).catch(error => logger.error('[Knex] Commande Query error: %s', error));
}

productQuery = () => {
  return knex('product')
    .leftJoin('collection', 'product.collectionId', 'collection.id')
    .innerJoin('product_performances', 'product.performance', 'product_performances.type')
    .leftJoin('product_colors', 'product.nbColors', 'product_colors.nbcolors')
    .then(product => {
      product.length ? logger.debug('[Knex] Liste des produits chargées (qte): %d', product.length) : logger.error('[Knex] Données Produits manquantes');
      return product
    }).catch(error => logger.error('[Knex] Product Query error: %s', error));
}

promoQuery = (code) => {
  return knex('promo')
    .where('code', code)
    .then(reduction => {
      reduction.length ? logger.debug('[Knex] Données Reduction chargées (id): %s', reduction[0]) : logger.warn('[Knex] Données Reduction manquantes (code): %s', code);
      return reduction[0]
    }).catch(error => logger.error('[Knex] Promo Query error: %s', error));
}

adminQuery = (email) => {
  return knex('admin')
    .where('user', email)
    .then(adminUser => {
      adminUser.length ? logger.debug('[Knex] Données Administration Utilisateur chargées (id): %s', adminUser[adminUser.length - 1].id) : logger.warn('[Knex] Données Administration Utilisateur manquantes (user): %s', user);
      return adminUser
    }).catch(error => logger.error('[Knex] Admin User Query error: %s', error));
}

// Routes

router.get('/adminCart', function(req, res, next) {
  cartQuery(req.query.sessid)
    .then(cart => {
      res.json(cart)
    })
});

router.get('/adminLivraison', function(req, res, next) {
  livraisonQuery(req.query.sessid)
    .then(livraison => {
      res.json(livraison)
    })
});

router.get('/adminPaiement', function(req, res, next) {
  commandeQuery(req.query.sessid)
    .then(commande => {
      res.json(commande)
    })
});

router.get('/adminUser', function(req, res, next) {
  userQuery(req.query.sessid)
    .then(user => {
      res.json(user)
    })
});

router.get('/user', function(req, res, next) {
  userQuery(req.sessionID)
    .then(user => {
      res.json(user)
    })
});


router.get('/livraison', function(req, res, next) {
  livraisonQuery(req.sessionID)
    .then(livraison => {
      res.json(livraison)
    })
});

router.get('/commande', function(req, res, next) {
  commandeQuery(req.sessionID)
    .then(commande => {
      res.json(commande)
    })
});

router.get('/getsessioncart', function(req, res, next) {
  if (req.session.cart) {
    res.json({
      cart: req.session.cart
    });
    logger.debug('[Panier] Session récupérée (produits) : %o', req.session.cart.length);
  } else {
    logger.debug('[Panier] Nouvelle session');
    res.json({
      cart: []
    })
  }
});

router.get('/getDBCart', function(req, res, next) {
  cartQuery(req.sessionID)
    .then(cart => {
      res.json(cart)
    })
});

router.get('/getreduction', function(req, res, next) {
  promoQuery(req.query.code)
    .then(reduction => {
      res.json(reduction)
    })
});

router.get('/shopDB', function(req, res, next) {
  productQuery()
    .then(shopData => {
      shopData.length ? logger.debug('[Knex] Liste des produits chargées (qte): %d', shopData.length) : logger.error('[Knex] Données Produits manquantes');
      var collections = new Map();
      shopData.forEach(product => {
        var currentCollection = collections.get(product.collectionId);
        if (currentCollection == null) {
          currentCollection = [];
          collections.set(product.collectionId, currentCollection);
        }
        currentCollection.push(product);
      })
      var collectionsArray = [];
      collections.forEach((products, collectionid, map) => {
        collectionsArray.push(products);
      })
      res.json([{
        collections: collectionsArray
      }]);
    });
});

router.get('/adminData', function(req, res, next) {
  productQuery()
    .then(function(productData) {
      knex('product_essences')
        .then(function(essencesData) {
          knex('user')
            .then(function(userData) {
              knex('informations')
                .then(function(informations) {
                  logger.debug('[Admin db] Données récupérées');
                  res.json({
                    product: productData,
                    essence: essencesData,
                    user: userData,
                    info: informations
                  });
                })
            })
        })
    })
});


module.exports = router;
module.exports.userQuery = userQuery;
module.exports.cartQuery = cartQuery;
module.exports.adminQuery = adminQuery;
module.exports.orderQuery = orderQuery;
