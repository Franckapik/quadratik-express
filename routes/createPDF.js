var express = require('express');
var router = express.Router();

const logger = require('../log/logger');
var pdf = require('html-pdf');
const fromDb = require('./getFromDB');
const pug = require('pug');
const fs = require('fs');

router.get('/dataSheet', function(req, res, next) {
  fromDb.productQueryFromSrc(req.query.productsrc)
    .then(produit => {
      const compiledFunction = pug.compileFile('././documentation/dataSheet'+req.query.locale+'.pug');

      const html = compiledFunction({ produit: produit[0] });

      pdf.create(html, config.toPDF).toFile('./../documentation/dataSheet.pdf', function(err, url) {
        if (err) return logger.error('[DataSheet] Erreur lors de la création %s', err);

        res.download(url.filename, 'dataSheet'+req.query.locale, (err) => {
          if (err) {
            logger.error('[DataSheet download] %s', err);
            return err
          } else {
            logger.info('[DataSheet download] Demande de téléchargement : %s', url.filename);
          }
        });
      });
    });
});

router.get('/devis', function(req, res, next) {
  fromDb.devisAllQuery(req.query.sessid)
    .then(devis => {
      const compiledFunction = pug.compileFile('././documentation/devis.pug');
      
      const html = compiledFunction({ devis: devis });

      pdf.create(html, config.toPDF).toFile('./../documentation/devis.pdf', function(err, url) {
        if (err) return logger.error('[DataSheet] Erreur lors de la création %s', err);

        res.download(url.filename, 'devis', (err) => {
          if (err) {
            logger.error('[Devis download] %s', err);
            return err
          } else {
            logger.info('[Devis download] Demande de téléchargement : %s', url.filename);
          }
        });
      });
    });
});


module.exports = router;
