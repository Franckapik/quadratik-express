var express = require('express');
var router = express.Router();
var corsOptions = {
  "origin": "http://localhost:3005",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  "credentials": true
}

var cors = require('cors');

const environment = process.env.NODE_ENV || 'development'; // if something else isn't setting ENV, use development
const configuration = require('../config')[environment]; // require environment's settings from knexfile
const knex = require('knex')(configuration);
const config = require('../config');

router.get('/adminData', function(req, res, next) {
  console.log('Demande de connexion sur la page admin :', req.query.user);
  if(req.query.user == config.adminUser.user1 || config.adminUser.user2) {
    knex('product')
      .leftJoin('collection', 'product.collectionId', 'collection.id')
      .innerJoin('product_performances', 'product.performance', 'product_performances.type')
      .leftJoin('product_colors', 'product.nbColors', 'product_colors.nbcolors')
      .then(function(productData) {
        knex('product_essences')
          .then(function(essencesData) {
            knex('user')
              .then(function(userData) {
                knex('informations')
                  .then(function(informations) {
                    console.log('[Admin] Connection autorisée');
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
  } else {
    res.status(500);
    console.log('[Admin] Nom d\'utilisateur incorrect');
  }


});

router.get('/adminCart', function(req, res, next) {
  knex('cart')
    .where('userid', req.query.sessid)
    .then(cart => {
      res.json(cart)
    }).catch(error => console.log(error));

});

router.get('/adminLivraison', function(req, res, next) {
  knex('livraison')
    .where('userid', req.query.sessid)
    .then(livraison => {
      res.json(livraison)
    }).catch(error => console.log(error));

});

router.get('/adminPaiement', function(req, res, next) {
  knex('commande')
    .where('userid', req.query.sessid)
    .then(commande => {
      res.json(commande)
    }).catch(error => console.log(error));

});

router.get('/adminAdresse', function(req, res, next) {
  knex('user')
    .where('userid', req.query.sessid)
    .then(adresse => {
      res.json(adresse)
    }).catch(error => console.log(error));

});



router.get('/user', function(req, res, next) {
  knex('user')
    .where('userid', req.sessionID)
    .then(user => {
      res.json(user)
    }).catch(error => console.log(error));

});

router.get('/livraison', cors(corsOptions), function(req, res, next) {

  knex('livraison')
    .where('userid', req.sessionID)
    .then(livraison => {
      res.json(livraison)
    }).catch(error => console.log(error));

});

router.get('/getsessioncart', cors(corsOptions), function(req, res, next) {
  if (req.session.cart) {
    res.json({
      cart: req.session.cart
    });
  } else {
    console.log('Pas de panier enregistré');
    res.json({
      cart: []
    })
  }
});

router.get('/getDBCart', cors(corsOptions), function(req, res, next) {
  knex('cart')
    .where('userid', req.sessionID)
    .then(cart => {
      res.json(cart)
    }).catch(error => console.log(error));
});

router.get('/getreduction', cors(corsOptions), function(req, res, next) {
  knex('promo')
    .where('code', req.query.code)
    .then(reduction => {
      res.json(reduction)
    }).catch(error => console.log(error));
});


router.get('/shopDB', function(req, res, next) {
  knex('product')
    .leftJoin('collection', 'product.collectionId', 'collection.id')
    .innerJoin('product_performances', 'product.performance', 'product_performances.type')
    .then(shopData => {
        var collections = new Map();
        shopData.forEach(product => {
          //Get the array associated with this collection id
          var currentCollection = collections.get(product.collectionId);

          //If there is no array for this value yet, create it.
          if (currentCollection == null) {
            currentCollection = [];
            collections.set(product.collectionId, currentCollection);
          }

          //Place the current product into the array
          currentCollection.push(product);
        })

        //The map will now contain an array for each collectionid, which again contains an array with its items
        var collectionsArray = [];
        collections.forEach((products, collectionid, map) => {
          collectionsArray.push(products);
        })

        res.json([{
          collections: collectionsArray
        }]);
      }

    );

});


module.exports = router;
