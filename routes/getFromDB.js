var express = require('express');
var router = express.Router();
var cors = require('cors');
const environment = process.env.NODE_ENV || 'development'; // if something else isn't setting ENV, use development
const configuration = require('../config')[environment]; // require environment's settings from knexfile
const knex = require('knex')(configuration);
const logger = require('../log/logger');
// Query Database

orderQuery = (where) => {
  return Promise.all([userQuery(where), cartQuery(where), livraisonQuery(where), commandeQuery(where)])
    .then(([user, cart, livraison, paiement]) => {
      return {
        user: user,
        cart: cart,
        livraison: livraison,
        paiement: paiement
      }
    })
};

devisAllQuery = (where) => {
  return Promise.all([devisQuery(where), userQuery(where), cartQuery(where), livraisonQuery(where), commandeQuery(where), infoQuery() ])
    .then(([devis, user, cart, livraison, paiement, infos]) => {
      return {
        devis : devis,
        user: user,
        cart: cart,
        livraison: livraison,
        paiement: paiement,
        infos : infos
      }
    })
};

tableQuery = (table, where) => {
  return knex(table)
    .where(where)
    .then(data => {
      data.length ? logger.debug('[Knex] Données Table ' + table + ' chargées (where): %o', where) : logger.warn('[Knex] Données ' + table+ ' manquantes (where): %o', where);
      return data[data.length - 1]
    }).catch(error => logger.error('[Knex] Erreur de chargement de ' + table + ' %s', error));
};

productQuery = () => {
  return knex('product')
    .rightJoin('collection', 'product.collectionId', 'collection.col_id')
    .innerJoin('product_performances', 'product.performance', 'product_performances.type')
    .leftJoin('product_colors', 'product.nbColors', 'product_colors.nbcolors')
    .then(product => {
      product.length ? logger.debug('[Knex] Liste des produits chargées (qte): %d', product.length) : logger.error('[Knex] Données Produits manquantes');
      return product
    }).catch(error => logger.error('[Knex] Product Query error: %s', error));
}

productQueryFromSrc = (src) => {
  return knex('product')
    .where('product.src', src)
    .leftJoin('collection', 'product.collectionId', 'collection.col_id')
    .innerJoin('product_performances', 'product.performance', 'product_performances.type')
    .leftJoin('product_colors', 'product.nbColors', 'product_colors.nbcolors')
    .then(product => {
      product.length ? logger.debug('[Knex] Produit retrouvé [id]: %s', product.id) : logger.error('[Knex] Données Produit manquantes');
      return product
    }).catch(error => logger.error('[Knex] Product Query error: %s', error));
}

productQueryById = (id) => {
  return knex('product')
    .where('product.id', id)
    .leftJoin('collection', 'product.collectionId', 'collection.col_id')
    .innerJoin('product_performances', 'product.performance', 'product_performances.type')
    .leftJoin('product_colors', 'product.nbColors', 'product_colors.nbcolors')
    .then(product => {
      product.length ? logger.debug('[Knex] Produit retrouvé [id]: %s', product.id) : logger.error('[Knex] Données Produit manquantes pour l\'id suivant : %s', id);
      return product
    }).catch(error => logger.error('[Knex] Product Query error: %s', error));
}


// Routes


//admin
//a changer sur l'admin si manquant
router.get('/adminCart', function(req, res, next) {
  tableQuery('cart', {'userid':req.query.sessid})
    .then(cart => {
      res.json(cart)
    })
});

router.get('/adminLivraison', function(req, res, next) {
  tableQuery('livraison', {'userid':req.query.sessid})
    .then(livraison => {
      res.json(livraison)
    })
});

router.get('/adminPaiement', function(req, res, next) {
  tableQuery('commande', {'userid':req.query.sessid})
    .then(commande => {
      res.json(commande)
    })
});

router.get('/adminUser', function(req, res, next) {
  tableQuery('user', {'userid':req.query.sessid})
    .then(user => {
      res.json(user)
    })
});

//query selon session actuelle
router.get('/user', function(req, res, next) {
  tableQuery('user', {'userid':req.sessionID})
    .then(user => {
      res.json(user)
    })
});

router.get('/devis', function(req, res, next) {
  devisAllQuery({'userid':req.query.sessid})
    .then(devis => {
      res.json(devis)
    })
});


router.get('/livraison', function(req, res, next) {
  tableQuery('livraison', {'userid':req.sessionID})
    .then(livraison => {
      res.json(livraison)
    })
});

router.get('/commande', function(req, res, next) {
  tableQuery('commande', {'orderid':req.query.orderid})
    .then(commande => {
      res.json(commande)
    })
});

router.get('/getDBCart', function(req, res, next) {
  tableQuery('cart', {'userid': req.sessionID, 'cartid' : req.query.cartid})
    .then(cart => {
      res.json(cart)
    })
});

router.get('/getreduction', function(req, res, next) {
  tableQuery('promo', {'code':req.query.code})
    .then(reduction => {
      res.json(reduction)
    })
});

router.get('/newsDB', function(req, res, next) {
  tableQuery('news', {'page':req.query.index})
    .then(news => {
      res.json(news)
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
          knex('user')
            .then(function(userData) {
              knex('informations')
                .then(function(informations) {
                  logger.debug('[Admin db] Données récupérées');
                  res.json({
                    product: productData,
                    user: userData,
                    info: informations
                  });
                })
            })
    })
});


router.get('/getProduits', function(req, res, next) {
  productQuery()
    .then(function(productData) {
      logger.debug('[Produits db] Données récupérées');
      res.json({
        product: productData,
      });
    });
});


router.get('/getProduitFromSrc', function(req, res, next) {
  productQueryFromSrc(req.query.productsrc)
    .then(data => {
      res.json(data);
      logger.debug('[Details Produits] Details du produit OK: %s', data);
    })
    .catch(error => logger.error('[Details Produits] Recherche produit non disponible pour l\'id suivant %s:', req.query.productsrc));
})


module.exports = router;
module.exports.tableQuery = tableQuery;
module.exports.orderQuery = orderQuery;
module.exports.productQueryFromSrc = productQueryFromSrc;
module.exports.devisAllQuery = devisAllQuery;
