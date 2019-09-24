var express = require('express');
var router = express.Router();
var corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  "credentials": true
}
var cors = require('cors');

const environment = process.env.NODE_ENV || 'development'; // if something else isn't setting ENV, use development

const logger = require('../log/logger');
const fromDb = require('./getFromDB');
var inDb = require('./saveInDB');

//parametres de connexion au server Braintree
var braintree = require("braintree");

if (environment === 'development') {
  logger.debug('[Braintree] Mode Sandbox');
  var gateway = braintree.connect(config.braintreeSandbox);
} else {
  if (environment === 'production') {
    logger.debug('[Braintree] Mode PRODUCTION');
    var gateway = braintree.connect(config.braintreeProduction);
  }
}

//generation et envoi du token pour faire le rendu UI Drop-in du client
router.get("/client_token", function(req, res) {
  gateway.clientToken.generate({}, function(err, response) {
    res.json(response.clientToken);
    err ? logger.error('[Braintree] Erreur de génération du token : %s', err) : logger.info('[Braintree] Token généré');
  });
});

//reception de la methode de paiement (nonce) du client et génération de la transaction
router.get("/nonce/:nonce", cors(corsOptions), function(req, res, next) {
  const nonceFromTheClient = req.params.nonce;

  const createUser = (user) => {
    gateway.customer.create({
      firstName: user.prenom,
      lastName: user.nom,
      email: user.mail,
      phone: user.telephone,
      paymentMethodNonce: nonceFromTheClient
    }, function(err, result) {
      err ? logger.error('[Braintree] Erreur de création de client: %s', err) : logger.info('[Braintree] Nouveau client: %s', result.customer.id);
    });
  };

  const makeTransaction = (amount, nonceFromTheClient) => {
    gateway.transaction.sale({
      amount: amount,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true
      }
    }, function(err, result) {
      if (result.success) {
        logger.info('[Braintree] Nouvelle transaction: %s', result.transaction.id);
        inDb.saveCommandeInDB(result, req.sessionID);
        console.log('ici', result);
        res.json(result);
      } else {
        logger.error('[Braintree] Erreur de transaction: %s', result.message);
      }
    });
  };

  fromDb.userQuery(req.sessionID)
  .then( user =>
    createUser(user) );

  fromDb.cartQuery(req.sessionID)
  .then(cart => {
    const amount = parseInt(cart[cart.length - 1].montant, 10).toFixed(2);
    makeTransaction(amount, nonceFromTheClient);
  })

});

module.exports = router;
