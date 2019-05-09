var express = require('express');
var router = express.Router();
const environment = process.env.NODE_ENV || 'development'; // if something else isn't setting ENV, use development
const configuration = require('../config')[environment]; // require environment's settings from knexfile
const knex = require('knex')(configuration);
const config = require('../config');
const parseString = require('xml2js').parseString;
const fetch = require('node-fetch');
global.Headers = fetch.Headers;

if (environment === 'development') {
  console.log('[Boxtal] Mode Test');
  var headers = new Headers(config.boxtalTest);
} else if (environment === 'production') {
  console.log('[Boxtal] Mode PRODUCTION');
  var headers = new Headers(config.boxtalProduction);
}

router.get('/relais', function(req, res, next) {
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
  knex('user')
    .where('userid', req.query.sessid)
    .then(user => {
      knex('cart')
        .where('sessid', req.query.sessid)
        .then(cart => {
          knex('commande')
            .where('userid', req.query.sessid)
            .then(commande => {
              knex('livraison')
                .where('userid', req.query.sessid)
                .then(livraison => {
                  const time = new Date().toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                  }).replace('/\//g', '-');

                  const nbMax = 5;
                  const nbColis = Math.trunc(cart[0].unites / nbMax);
                  const resteColis = cart[0].unites % nbMax;

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
                    "destinataire.code_postal": livraison[0].livr_postal,
                    "destinataire.ville": livraison[0].livr_ville,
                    "destinataire.type": "particulier",
                    "destinataire.adresse": livraison[0].livr_adresse,
                    "destinataire.civilite": "M",
                    "destinataire.prenom": user[0].prenom,
                    "destinataire.nom": user[0].nom,
                    "destinataire.email": user[0].mail,
                    "destinataire.tel": user[0].telephone
                  }

                  const options = {
                    "depot.pointrelais": "SOGP-O2187",
                    "retrait.pointrelais": livraison[0].livr_mode,
                    "assurance.selected": "false",
                    "platform": "api",
                    "collecte": time,
                    "delai": "aucun",
                    "operateur": livraison[0].operateur,
                    "service": livraison[0].livr_service,
                    "code_contenu": 10120
                  }

                  let envoi = {
                    ...expediteur,
                    ...destinataire,
                    ...listeColis,
                    ...options
                  };

                  res.json(envoi);
                })
            })
        })
    })
    .catch(error => console.log(error));



});

router.post('/order', function(req, res, next) {
  let recherche = new URLSearchParams(req.body);

  var url = new URL('https://test.envoimoinscher.com/api/v1/order')

  url.search = recherche;

  fetch(url, {
      headers: headers,
      credentials: 'include',
      mode: 'cors',
      method: 'POST',
    })
    .then(response => response.text())
    .then(data => {
      parseString(data, function(result, err) {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
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
  let recherche = new URLSearchParams(envoi);

  var url = new URL('https://test.envoimoinscher.com/api/v1/cotation'); //attention a bien supprimer le test.

  url.search = recherche;

  fetch(url, {
      headers: headers,
      credentials: 'include',
      mode: 'cors',
      method: 'GET',
    })
    .then(response => response.text())
    .then(data => {
      parseString(data, function(result, err) {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      });
    })
});

module.exports = router;
