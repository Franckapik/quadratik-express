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
const invoiceIt = require('@rimiti/invoice-it');
invoiceIt.configure({
  global: {
        lang: 'fr',
        logo: 'http://localhost:3000/images/logo2.jpg',
        footer: {
            fr: 'Quadratik.fr | Maitriser l\'acoustique de votre studio - SIRET: 83529797900014 <br> NAF-APE: 1629Z',
        },
    }
});

const environment = process.env.NODE_ENV || 'development'; // if something else isn't setting ENV, use development
const configuration = require('../config')[environment]; // require environment's settings from knexfile
const knex = require('knex')(configuration);
const config = require('../config');

function facturation(user) {
console.log(user[0]);
const u = user[0];

  const emitter = {
    name: 'Quadratik.fr',
    street_number: '1',
    street_name: 'Rue d\'Aubigné',
    zip_code: '35440',
    city: 'Feins',
    country: 'France',
    phone: '+33631927481',
    mail: 'contact@quadratik.fr'
  };

  const recipient = {
    company_name: u.nom +' '+ u.prenom,
    street_name: u.adresse,
    zip_code: u.postal,
    city: u.ville,
    country: 'France',
    phone: u.telephone,
    mail: u.mail,
  };
  
  const order = invoiceIt.create(recipient, emitter);

  order.article = {
    description: 'Pack 5 Woodik',
    tax: 0,
    price: 264,
    qt: 1,
  };

  order.article = {
    description: 'Frais de port',
    tax: 0,
    price: 12,
    qt: 1,
  };

  order.order_note = 'Livraison à domicile';

  return order.getOrder().toPDF().toFile('./factures/commande.pdf')
  .then(() => {
      return 'Fichier PDF créé'
  });
}


router.get('/', function(req, res, next) {
  console.log('Creation de la facture', req.query.sessid);
  knex('user')
    .innerJoin('cart', 'user.userid', 'cart.sessid')
    .innerJoin('livraison', 'user.userid', 'livraison.userid')
    .innerJoin('commande', 'user.userid', 'commande.userid')
    .then(user => {
      facturation(user).then((result) => res.send(result));
    }).catch(error => console.log(error));
});


module.exports = router;
