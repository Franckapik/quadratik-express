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
const logger = require('../log/logger');
var pdf = require('html-pdf');
const fromDb = require('./getFromDB');
const pug = require('pug');
const fs = require('fs');


const invoiceIt = require('@rimiti/invoice-it').default;
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
  [].forEach.call(arguments, function(el) {
    if (!el.length) {
      logger.warn('[Facture] Données client manquantes %s', el);
    }
  });

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
  logger.info('[Facture] Generation de facture pour le client suivant :%s', recipient.company_name);

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

  logger.info('[Facture] Creation du fichier %s', url);
  return order.getOrder().toPDF().toFile(url)
    .then(() => {
      return commande[0].transactionid
    });
}


router.get('/createFacture', function(req, res, next) {
  knex('user')
    .where('userid', req.query.sessid)
    .then(user => {
      user.length ? logger.debug('[Facture db] Données utilisateur récupérées (id): %s', user[0].id) : logger.warn('[Facture db] Données utilisateur manquantes');
      knex('cart')
        .where('userid', req.query.sessid)
        .then(cart => {
          cart.length ? logger.debug('[Facture db] Données panier récupérées (id): %s', cart[0].id) : logger.warn('[Facture db] Données panier manquantes');
          knex('commande')
            .where('userid', req.query.sessid)
            .then(commande => {
              commande.length ? logger.debug('[Facture db] Données commande récupérées (id): %s', commande[0].id) : logger.warn('[Facture db] Données commande manquantes');
              knex('livraison')
                .where('userid', req.query.sessid)
                .then(livraison => {
                  livraison.length ? logger.debug('[Facture db] Données livraison récupérées (id): %s', livraison[0].id) : logger.warn('[Facture db] Données livraison manquantes');
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
  logger.debug("[Facture sessid] %s", req.query.sessid);
  knex('commande')
    .where('userid', req.query.sessid)
    .then(commande => {
      const url = './factures/commande' + commande[0].transactionid + '.pdf';
      res.download(url, 'facture', (err) => {
        if (err) {
          logger.error('[Facture download] %s', err);
          return
        } else {
          logger.info('[Facture download] Demande de téléchargement : %s', url);
        }
      });
    })
    .catch(error => {
      logger.error(err);
    });
});

router.get('/dataSheet', function(req, res, next) {
  fromDb.productQueryFromSrc(req.query.productsrc)
    .then(produit => {
      console.log(req.query.locale);
      if(req.query.locale === 'FR') {
        var template = '././documentation/dataSheetFR.pug';
      }
      else if(req.query.locale === 'EN') {
        template= '././documentation/dataSheetEN.pug';
      }
      else {
        logger.debug('[DataSheet] Locale manquante ou non correspondante');
      }

      const compiledFunction = pug.compileFile(template);

      const html = compiledFunction({ produit: produit[0] });

      pdf.create(html, config.toPDF).toFile('./../documentation/dataSheet.pdf', function(err, url) {
        if (err) return logger.error('[DataSheet] Erreur lors de la création %s', err);

        res.download(url.filename, 'dataSheet'+req.query.locale, (err) => {
          if (err) {
            logger.error('[DataSheet download] %s', err);
            return
          } else {
            logger.info('[DataSheet download] Demande de téléchargement : %s', url.filename);
          }
        });
      });

    });
});


module.exports = router;
module.exports.facturation = facturation;
