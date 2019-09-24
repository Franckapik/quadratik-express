var express = require('express');
var router = express.Router();
var cors = require('cors');
const environment = process.env.NODE_ENV || 'development'; // if something else isn't setting ENV, use development
const configuration = require('../config')[environment]; // require environment's settings from knexfile
const knex = require('knex')(configuration);
const logger = require('../log/logger');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

var corsOptions = {
  "origin": "http://localhost:3000",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  "credentials": true
}

logger.info('[Knex] Mode %s', environment);


//enregistrement des sessions Express

const sessionStore = new KnexSessionStore({
  knex,
  tablename: 'sessions', // optional. Defaults to 'sessions'

});

router.post('/enregistrement', function(req, res, next) {
  knex('user')
    .insert({
      nom: req.body.firstName,
      userid: req.sessionID,
      prenom: req.body.lastName,
      adresse: req.body.adresse,
      ville: req.body.ville,
      postal: req.body.codepostal,
      mail: req.body.email,
      telephone: req.body.telephone,
      contexte: req.body.contexte
    })
    .returning('id')
    .then(user => {
      logger.info('[Knex] Données Utilisateur enregistrées (id): %s', user[0]);
      res.sendStatus(200);
    }).catch(error => logger.error('[Enregistrement utilisateur] Sauvegarde db %s', error))
});

router.post('/livraison', function(req, res, next) {
  knex('livraison')
    .insert({
      livr_mode: req.body.mode,
      livr_service: req.body.service,
      livr_nom: req.body.firstName,
      livr_adresse: req.body.adresse,
      livr_ville: req.body.ville,
      livr_postal: req.body.codepostal,
      operateur: req.body.operateur,
      userid: req.sessionID,
    })
    .returning('id')
    .then(livraison => {
      logger.info('[Knex] Données Livraison enregistrées (id): %s', livraison[0]);
      res.sendStatus(200);
    }).catch(error => logger.error('[Livraison] Sauvegarde db %s', error))
});

router.post('/savesessioncart', function(req, res, next) {
  req.session.cart = req.body;
  req.session.save(function(err) {
    err ? logger.error('[Panier] Session Panier non sauvegardée : %s', err) : logger.debug('[Panier] Session Panier sauvegardée (produits) : %d', req.session.cart.length);
  })
  res.end();
});

router.post('/resetcart', function(req, res, next) {
  req.session.cart = 0;
  req.session.save(function(err) {
    err ? logger.error('[Panier] Reset Panier échoué : %s', err) : logger.debug('[Panier] Reset du Panier');
  })
  res.end();
});



router.post('/saveCartOnDB', function(req, res, next) {
  const panier = req.body.cart;
  var enregistrementCart = panier.map((p, i) => {
    return knex('cart')
      .returning('id')
      .insert({
        name: p.produit.nom,
        quantite: p.qte,
        reduction: req.body.reduction,
        fdp: req.body.fdp,
        sous_total: p.qte * p.produit.prix,
        prix: p.produit.prix,
        montant: req.body.total,
        userid: req.session.id,
        hauteur: req.body.hauteur,
        poids: req.body.poids,
        unites: req.body.unites
      }).then((id) => {
        return id
      }).catch((error) => logger.error('[Panier] Sauvegarde db %s', error));
  });

  Promise.all(enregistrementCart).then(function(results) {
    logger.info('[Knex] Données Panier enregistrées (id): %s', results);
    res.json({
      success: results
    })
  })

});

//braintree

const saveCommandeInDB = (result, sessid) => {
  logger.debug('[Braintree] Result: %o', result.transaction.status);
  logger.debug('[Braintree] Sessid: %o', sessid);

  return knex('commande')
    .insert({
      userid: sessid,
      status: result.transaction.status,
      mode: result.transaction.paymentInstrumentType,
      amount: result.transaction.amount,
      cardtype: result.transaction.creditCard.cardType,
      number: result.transaction.creditCard.maskedNumber,
      expirationdate: result.transaction.creditCard.expirationDate,
      transactionid: result.transaction.id
    })
    .returning('transactionid')
    .then(transactionid => {
      logger.info('[Braintree db] Transaction enregistrée: %s', transactionid);
      return transactionid
    }).catch((error) => logger.error('[Braintree db] Transaction non enregistrée %s', error));
};

module.exports = router;
module.exports.saveCommandeInDB = saveCommandeInDB;
module.exports.sessionStore = sessionStore;
