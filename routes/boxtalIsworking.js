var express = require('express');
var router = express.Router();
const environment = process.env.NODE_ENV || 'development'; // if something else isn't setting ENV, use development
const configuration = require('../config')[environment]; // require environment's settings from knexfile
const config = require('../config');
const parseString = require('xml2js').parseString;
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');
global.Headers = fetch.Headers;

router.get('/relais', function(req, res, next) {
  if (environment === 'development') {
    console.log('[Boxtal] Mode Test');
    var headers = new Headers(config.boxtalTest);
  } else {
    if (environment === 'production') {
      console.log('[Boxtal] Mode PRODUCTION');
      var headers = new Headers(config.boxtalProduction);
    }
  }

  fetch("https://test.envoimoinscher.com/api/v1/pickup_point/" + req.query.pickup_code + "/informations", {
      headers: headers,
      credentials: 'include',
      mode: 'cors',
      method: 'GET',
    })
    .then(response => response.text())
    .then(data => {
      parseString(data, function(err, result) {
        res.json(result);
      });
    })

});

router.get('/etiquette', function(req, res, next) {
  let colis = new URLSearchParams();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  };
  const time = new Date().toLocaleDateString("fr-FR", options).replace('/\//g', '-');

  colis.set("expediteur.pays", "FR");
  colis.set("expediteur.code_postal", "35440");
  colis.set("expediteur.ville", "Feins");
  colis.set("expediteur.type", "entreprise");
  colis.set("expediteur.adresse", "1 rue d'aubigné");
  colis.set("expediteur.civilite", "M");
  colis.set("expediteur.prenom", "Fanch");
  colis.set("expediteur.nom", "Cavellec");
  colis.set("expediteur.email", "contact@quadratik.fr");
  colis.set("expediteur.tel", "0631927481");
  colis.set("expediteur.societe", "Quadratik.fr");

  colis.set("destinataire.pays", "FR");
  colis.set("destinataire.code_postal", "35000");
  colis.set("destinataire.ville", "Rennes");
  colis.set("destinataire.type", "particulier");
  colis.set("destinataire.adresse", "Boulevard magenta");
  colis.set("destinataire.civilite", "M");
  colis.set("destinataire.prenom", "François");
  colis.set("destinataire.nom", "Baba");
  colis.set("destinataire.email", "fanch44@gmail.com");
  colis.set("destinataire.tel", "0631927485");

  colis.set("colis_1.poids", "8");
  colis.set("colis_1.longueur", "50");
  colis.set("colis_1.largeur", "50");
  colis.set("colis_1.hauteur", "49");
  colis.set("colis_1.description", "Diffuseurs acoustiques");

  colis.set("assurance.selected", "false");
  colis.set("platform", "api");

  colis.set("collecte", time);
  colis.set("delai", "aucun");
  colis.set("operateur", "MONR");
  colis.set("service", "CpourToi");
  colis.set("code_contenu", 10120);

  var url = new URL('https://test.envoimoinscher.com/api/v1/order')

  url.search = colis;

  if (environment === 'development') {
    console.log('[Boxtal] Mode Test');
    var headers = new Headers(config.boxtalTest);
  } else {
    if (environment === 'production') {
      console.log('[Boxtal] Mode PRODUCTION');
      var headers = new Headers(config.boxtalProduction);
    }
  }

  fetch(url, {
      headers: headers,
      credentials: 'include',
      mode: 'cors',
      method: 'POST',
    })
    .then(response => response.text())
    .then(data => {
      parseString(data, function(err, result) {
        res.json(result);
        return result;
      });
    })
});



module.exports = router;
