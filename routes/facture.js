var express = require('express');
var router = express.Router();
const environment = process.env.NODE_ENV || 'development'; // if something else isn't setting ENV, use development
const configuration = require('../config')[environment]; // require environment's settings from knexfile
const knex = require('knex')(configuration);
const config = require('../config');
var cors = require('cors');
var corsOptions = {
  "origin": "http://localhost:3005",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  "credentials": true
}


const invoiceIt = require('@rimiti/invoice-it');
invoiceIt.configure({
  global: {
    lang: 'fr',
    logo: 'http://localhost:3000/images/logo2.jpg',
    footer: {
      fr: 'Quadratik.fr | Maitrisez l\'acoustique de votre studio - SIRET: 83529797900014 <br> NAF-APE: 1629Z',
    },
  }
});


function facturation(user, cart, commande, livraison) {
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
    company_name: u.nom + ' ' + u.prenom,
    street_name: u.adresse,
    zip_code: u.postal,
    city: u.ville,
    country: 'France',
    phone: u.telephone,
    mail: u.mail,
  };

  const order = invoiceIt.create(recipient, emitter);

  cart.map((c, i) => {
    order.article = {
      description: c.name,
      tax: 0,
      price: c.prix,
      qt: Math.round(c.quantite)
    };
  });

  order.article = {
    description: 'Frais de port',
    tax: 0,
    price: cart[0].fdp,
    qt: 1,
  };

  order.order_note = 'Transaction : ' + commande[0].transactionid + ' Livraison : ' + livraison[0].livr_mode;

  const url = './factures/commande' + commande[0].transactionid + '.pdf';
  return order.getOrder().toPDF().toFile(url)
    .then(() => {
      return commande[0].transactionid
    });
}


router.get('/', function(req, res, next) {
  knex('user')
    .where('userid', req.query.sessid)
    .then(user => {
      knex('cart')
        .where('userid', req.query.sessid)
        .then(cart => {
          knex('commande')
            .where('userid', req.query.sessid)
            .then(commande => {
              knex('livraison')
                .where('userid', req.query.sessid)
                .then(livraison => {
                  facturation(user, cart, commande, livraison)
                    .then(result =>
                      res.json(result));
                })
            })
        })
    })
    .catch(error => {
        console.log('[Facturation]', error)
      }


    );
});

router.get('/getFacture', function(req, res, next) {
  knex('commande')
    .where('userid', req.query.sessid)
    .then(commande => {
      const url = './factures/commande' + commande[0].transactionid + '.pdf';
      res.download(url, 'facture', (err) => {
        if (err) {
          console.log(err);
          return
        } else {
          console.log('[Facture] Demande de téléchargement :', url );
        }
      });
    })
    .catch(error => {
      console.log('[Facture] ', error)
    });
});


module.exports = router;
module.exports.facturation = facturation;
