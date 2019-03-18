var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development'; // if something else isn't setting ENV, use development
const configuration = require('../config')[environment]; // require environment's settings from knexfile
const knex = require('knex')(configuration);


//parametres de connexion au server Braintree
var braintree = require("braintree");

if (environment === 'development') {
  console.log('[Braintree] Mode Sandbox');
  var gateway = braintree.connect(config.braintreeSandbox);
} else {
  if (environment === 'production') {
    console.log('[Braintree] Mode PRODUCTION');
    var gateway = braintree.connect(config.braintreeProduction);
  }
}

//generation et envoi du token pour faire le rendu UI Drop-in du client
router.get("/client_token", function(req, res) {
  gateway.clientToken.generate({}, function(err, response) {
    res.json(response.clientToken);
  });
});

//reception de la methode de paiement (nonce) du client et génération de la transaction
router.get("/nonce/:nonce", function(req, res) {
  var nonceFromTheClient = req.params.nonce;
  // Use payment method nonce here

  (async () => {
    await knex('user')
      .where('userid', req.sessionID)
      .then(user => {
        console.log(req.sessionID, user); // probleme a regler sur la session id
        gateway.customer.create({
          firstName: user[user.length - 1].prenom,
          lastName: user[user.length - 1].nom,
          email: user[user.length - 1].mail,
          phone: user[user.length - 1].telephone,
          paymentMethodNonce: nonceFromTheClient
        }, function(err, result) {
          if (result.success) {
            console.log('[Braintree] Nouveau client', result.customer.id);
          } else {
            console.log(err);
          }
        });
      });


    await knex('cart')
      .where('sessid', req.sessionID)
      .then(cart => {
        console.log(cart);
        const amount = parseInt(cart[cart.length - 1].sous_total, 10).toFixed(2);
        gateway.transaction.sale({
          amount: amount,
          paymentMethodNonce: nonceFromTheClient,
          options: {
            submitForSettlement: true
          }
        }, function(err, result) {
          if (result) {
            console.log('[Braintree] Nouvelle transaction', result.transaction.id);
            //Enregistrement Base de donnée
            knex('commande')
              .returning('transactionid')
              .insert({
                userid: req.sessionID,
                status: result.transaction.status,
                mode: result.transaction.paymentInstrumentType,
                amount: result.transaction.amount,
                cardtype: result.transaction.creditCard.cardType,
                number: result.transaction.creditCard.maskedNumber,
                expirationdate: result.transaction.creditCard.expirationDate,
                transactionid: result.transaction.id
              })
              .then(transactionid => {
                res.json({
                  result: result,
                  reference: transactionid
                })
              });
          } else {
            res.status(500).send(error);
          }
        });
      })
  })()

});

module.exports = router;
