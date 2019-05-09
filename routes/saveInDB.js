var express = require('express');
var router = express.Router();
var corsOptions = {
  "origin": "http://localhost:3000",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  "credentials": true
}

var cors = require('cors');

const environment = process.env.NODE_ENV || 'development'; // if something else isn't setting ENV, use development
const configuration = require('../config')[environment]; // require environment's settings from knexfile
const knex = require('knex')(configuration);


router.post('/enregistrement', function(req, res, next) {
  console.log('Enregistrement utilisateur', req.body);
  knex('user')
    .insert({
      nom: req.body.firstName,
      userid: req.sessionID,
      prenom: req.body.lastName,
      adresse: req.body.adresse,
      ville: req.body.ville,
      postal: req.body.codepostal,
      mail: req.body.email,
      telephone: req.body.telephone,
      contexte: req.body.contexte
    })
    .returning('user')
    .then(user => {
        console.log('Données enregistrées', user);
        res.json({
          success: user,
          dbId: user.id
        })
      }

    ).catch(error => console.log(error))
});

router.post('/livraison', function(req, res, next) {
  console.log('Enregistrement livraison',req.sessionID, req.body);
  knex('livraison')
    .insert({
      livr_mode: req.body.mode,
      livr_service: req.body.service,
      livr_nom: req.body.firstName,
      livr_adresse: req.body.adresse,
      livr_ville: req.body.ville,
      livr_postal: req.body.codepostal,
      operateur: req.body.operateur,
      userid: req.sessionID,
    })
    .then(
      res.json({
        success: req.body
      })
    )
});

router.post('/savesessioncart', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");

  req.session.cart = req.body;
  req.session.save();
  res.json({
    success: req.session.cart
  })


});

router.post('/saveCartOnDB', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  const panier = req.body.cart;

  panier.map((p, i) => {
    knex('cart')
      .returning('id')
      .insert({
        name: p.produit.nom,
        quantite: p.qte,
        reduction: req.body.reduction,
        fdp: req.body.fdp,
        sous_total: p.qte * p.produit.prix,
        prix: p.produit.prix,
        montant : req.body.total,
        sessid: req.session.id,
        hauteur: req.body.hauteur,
        poids: req.body.poids,
        unites: req.body.unites

      }).then((id) => res.json({
        success: id
      })).catch((error) => console.log(error));

  })




});

module.exports = router;
