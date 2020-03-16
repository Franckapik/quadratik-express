var express = require('express');
var router = express.Router();

var config = require('./../config');

const environment = process.env.NODE_ENV || 'development'; // if something else isn't setting ENV, use development

const logger = require('../log/logger');
const fromDb = require('./getFromDB');
var inDb = require('./saveInDB');

//parametres de connexion au server Braintree
var braintree = require("braintree");
const { createMollieClient} = require('@mollie/api-client');
let mollieClient = createMollieClient({ apiKey: config.mollieTest});
let domaine = 'localhost:3000';


if (environment === 'development') {
  logger.info('[Mollie] Mode Test');
} else {
  if (environment === 'production') {
    logger.warn('[Mollie] Mode PRODUCTION');
    mollieClient = createMollieClient({
      apiKey: config.mollieLive
    });
    domaine = 'www.quadratik.fr';
  }
}

//parametres de connexion mollie


const createUser = (user) => {

  const mollieUser = {
    name: user.nom,
    email: user.mail
  }

  mollieClient.customers
    .create(mollieUser)
    .then(customer => {
      logger.info('[Paiement Mollie] Nouveau client: %s', customer.id, customer.name);
    })
    .catch(error => {
      logger.error('[Paiement Mollie] Erreur de création de client: %s', error)
    });
};

//webhook a definir.

const webhook = (id) => {
  mollieClient.payments
    .get(id)
    .then(payment => {
      if (payment.isPaid()) {
        // Hooray, you've received a payment! You can start shipping to the consumer.
      } else if (!payment.isOpen()) {
        // The payment isn't paid and has expired. We can assume it was aborted.
      }
      res.send(payment.status);
    })
    .catch(error => {
      // Do some proper error handling.
      res.send(error);
    });
};

const makeTransaction = (amount, token) => {
  const orderId = new Date().getTime();
  return mollieClient.payments
    .create({
      method: 'creditcard',
      amount: {
        value: amount,
        currency: 'EUR'
      },
      description: `Commande n° ${orderId}`,
      redirectUrl: `http://${domaine}/order/${orderId}`,
      webhookUrl: `https://www.quadratik.fr/webhookPaiement/${orderId}`,
      metadata: {
        orderId
      },
      cardToken: token
    })
};



//reception de la methode de paiement (nonce) du client et génération de la transaction
router.get("/virement", (req, res) => {
  const orderId = new Date().getTime();

  fromDb.tableQuery('cart', {'userid' : req.sessionID})
    .then(cart => {
      const amount = parseInt(cart.montanttotal, 10).toFixed(2);

      const payment = {
        userid: req.sessionID,
        status: 'open',
        method: 'virement',
        amount: amount,
        orderid: orderId,
        date: Number(new Date()),
        redirect: `http://${domaine}/order/${orderId}`,
        metadata : { orderId : orderId }
      }

      inDb.saveCommandeInDB(payment, amount, req.sessionID)
      res.send({
        payment: payment,
        redirect: payment.redirect
      });
    });
});

router.get("/create", (req, res) => {
  fromDb.tableQuery('user', {'userid' : req.sessionID})
    .then(user =>
      createUser(user)
    );

    fromDb.tableQuery('cart', {'userid' : req.sessionID})
    .then(cart => {
      const amount = parseInt(cart.montanttotal, 10).toFixed(2);
      makeTransaction(amount)
        .then(payment => {
          inDb.saveCommandeInDB(payment, amount, req.sessionID)
          res.send({
            payment: payment,
            redirect: payment.getPaymentUrl()
          });
        })
        .catch(error => {
          // Do some proper error handling.
          res.send(error);
        });
    });
});


module.exports = router;
