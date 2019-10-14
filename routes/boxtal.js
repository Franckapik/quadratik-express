var express = require('express');
var router = express.Router();
const env = process.env.NODE_ENV || 'development';
const configuration = require('../config')[env];
const knex = require('knex')(configuration);
const config = require('../config');
const parseString = require('xml2js').parseString;
const fetch = require('node-fetch');
global.Headers = fetch.Headers;
let boxtalUrl = null;
const logger = require('../log/logger');
const fromDb = require('./getFromDB');


if (env === 'development') {
  logger.info('[Boxtal] Mode Test');
  var headers = new Headers(config.boxtalTest);
  boxtalUrl = 'https://test.envoimoinscher.com/api/v1/';

} else if (env === 'production') {
  logger.info('[Boxtal] Mode PRODUCTION');
  var headers = new Headers(config.boxtalProduction);
  boxtalUrl = 'https://www.envoimoinscher.com/api/v1/';

}

router.get('/relais', function(req, res, next) {
  fetch(boxtalUrl + "pickup_point/" + req.query.pickup_code + "/informations", {
      headers: headers,
      credentials: 'include',
      mode: 'cors',
      method: 'GET',
    })
    .then(response => response.text())
    .then(data => {
      parseString(data, function(err, result) {
        res.json(result);
        logger.debug('Informations relais : %s', result.pickup_point.code);
        if(err) {
          logger.error('Impossible de recevoir/convertir les données du relais');
        }
      });
    })

});

router.get('/etiquette', function(req, res, next) {
  fromDb.orderQuery(req.query.sessid)
  .then(order => {
                  const time = new Date().toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                  }).replace('/\//g', '-');

                  const nbMax = 5;
                  const nbColis = Math.trunc(order.cart[0].unites / nbMax);
                  const resteColis = order.cart[0].unites % nbMax;

                  let listeColis = [];
                  for (i = 1; i <= nbColis; i++) {
                    listeColis['colis_' + i + '.poids'] = '8';
                    listeColis['colis_' + i + '.longueur'] = '50';
                    listeColis['colis_' + i + '.largeur'] = '50';
                    listeColis['colis_' + i + '.hauteur'] = '55';
                    listeColis['colis_' + i + '.description'] = "Diffuseurs acoustiques";
                  }

                  if (resteColis) {
                    a = nbColis + 1;
                    listeColis['colis_' + a + '.poids'] = (resteColis * 2).toString();
                    listeColis['colis_' + a + '.longueur'] = '50';
                    listeColis['colis_' + a + '.largeur'] = '50';
                    listeColis['colis_' + a + '.hauteur'] = (resteColis * 10).toString();
                    listeColis['colis_' + a + '.description'] = "Diffuseurs acoustiques";
                  }

                  const expediteur = {
                    "expediteur.pays": "FR",
                    "expediteur.code_postal": "35440",
                    "expediteur.ville": "Feins",
                    "expediteur.type": "entreprise",
                    "expediteur.adresse": "1 rue d'aubigné",
                    "expediteur.civilite": "M",
                    "expediteur.prenom": "Fanch",
                    "expediteur.nom": "Cavellec",
                    "expediteur.email": "contact@quadratik.fr",
                    "expediteur.tel": "0631927481",
                    "expediteur.societe": "Quadratik.fr"
                  }

                  const destinataire = {
                    "destinataire.pays": "FR",
                    "destinataire.code_postal": order.livraison.livr_postal,
                    "destinataire.ville": order.livraison.livr_ville,
                    "destinataire.type": "particulier",
                    "destinataire.adresse": order.livraison.livr_adresse,
                    "destinataire.civilite": "M",
                    "destinataire.prenom": order.user.prenom,
                    "destinataire.nom": order.user.nom,
                    "destinataire.email": order.user.mail,
                    "destinataire.tel": order.user.telephone
                  }

                  const options = {
                    "depot.pointrelais": "SOGP-O2187",
                    "retrait.pointrelais": order.livraison.livr_mode,
                    "assurance.selected": "false",
                    "platform": "api",
                    "collecte": time,
                    "delai": "aucun",
                    "operateur": order.livraison.operateur,
                    "service": order.livraison.livr_service,
                    "code_contenu": 10120
                  }

                  let envoi = {
                    ...expediteur,
                    ...destinataire,
                    ...listeColis,
                    ...options
                  };

                  res.json(envoi);
                  logger.debug("Demande de création d'étiquette suivante: %o", envoi);
                })
    .catch(error => logger.error('[Boxtal Etiquette] Erreur: %o', error));



});

router.post('/order', function(req, res, next) {
  let recherche = new URLSearchParams(req.body);
  var url = new URL(boxtalUrl + 'order')
  url.search = recherche;
  logger.debug("[Boxtal Order] Paramètres de commandes: %o", url.search);

  fetch(url, {
      headers: headers,
      credentials: 'include',
      mode: 'cors',
      method: 'POST',
    })
    .then(response => response.text())
    .then(data => {
      parseString(data, function(err, result) {
        if (err) {
          res.json(err);
          logger.error("[Boxtal Order] Erreur lors de la commande: %o", err);
        } else {
          res.json(result);
          logger.info("[Boxtal Order] Commande validée: %s", result.order.shipment[0].reference);
        }

      });
    })
});

router.get('/cotation', function(req, res, next) {
  const time = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).replace('/\//g', '-');


  const expediteur = {
    "expediteur.pays": "FR",
    "expediteur.code_postal": "35440",
    "expediteur.ville": "Feins",
    "expediteur.type": "entreprise",
    "expediteur.adresse": "1 rue d'aubigné",
  }

  const destinataire = {
    "destinataire.pays": "FR",
    "destinataire.code_postal": req.query.code_postal,
    "destinataire.ville": req.query.ville,
    "destinataire.type": "particulier",
    "destinataire.adresse": req.query.adresse,
  }

  const colis_1 = {
    "colis_1.poids": req.query.poids,
    "colis_1.longueur": req.query.longueur,
    "colis_1.largeur": req.query.largeur,
    "colis_1.hauteur": req.query.hauteur,
  }

  const options = {
    "collecte": time,
    "delai": "aucun",
    "operateur": req.query.transporteur,
    "code_contenu": 10120
  }

  let envoi = {
    ...expediteur,
    ...destinataire,
    ...colis_1,
    ...options
  };

  logger.debug("Recherche Relais avec informations suivantes: %o", envoi);

  let recherche = new URLSearchParams(envoi);

  var url = new URL(boxtalUrl + 'cotation');

  url.search = recherche;

  logger.debug("[Boxtal Relais] Paramètres de recherche relais: %o", url.search);

  fetch(url, {
      headers: headers,
      credentials: 'include',
      mode: 'cors',
      method: 'GET',
    })
    .then(response => response.text())
    .then(data => {
      console.log('cotation', data);
      parseString(data, function(result, err) {
        if (err) {
          res.json(err);
          logger.error("[Boxtal Relais] Erreur lors de la recherche relais: %o", err);
        } else {
          res.json(result);
          logger.debug("[Boxtal Relais] Relais listés: %o", result.cotation.shipment[0].offer[0].mandatory_informations[0].parameter[13].type[0].enum);

        }
      });
    })
});

module.exports = router;
