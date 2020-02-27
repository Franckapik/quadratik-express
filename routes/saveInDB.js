var express = require('express');
var router = express.Router();
var cors = require('cors');
const environment = process.env.NODE_ENV || 'development'; // if something else isn't setting ENV, use development
const configuration = require('../config')[environment]; // require environment's settings from knexfile
const knex = require('knex')(configuration);
const logger = require('../log/logger');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

var corsOptions = {
  "origin": "http://localhost:3000",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  "credentials": true
}

logger.warn('[Knex] Mode %s', environment);


//enregistrement des sessions Express

const sessionStore = new KnexSessionStore({
  knex,
  tablename: 'sessions', // optional. Defaults to 'sessions'
});

userSave = (user, sessid) => {
  return knex('user')
    .insert({
      nom: user.firstName,
      userid: sessid,
      prenom: user.lastName,
      adresse: user.adresse,
      ville: user.ville,
      pays: user.pays,
      postal: user.codepostal,
      mail: user.email,
      telephone: user.telephone,
      contexte: user.contexte
    })
    .returning('id')
    .then(userId => {
      logger.info('[Knex] Données Utilisateur enregistrées (id): %s', userId[0]);
      return userId
    }).catch(error => logger.error('[Enregistrement utilisateur] Sauvegarde db %s', error))
};

devisSave = (devis, sessid) => {
  return knex('devis')
    .insert({
      id: sessid,
      entreprise: devis.entreprise.Nom_entreprise,
      code_postal: devis.entreprise.Code_postal,
      mail: devis.entreprise.Mail,
      adresse: devis.entreprise.Adresse,
      pays: devis.entreprise.Pays,
      siret: devis.entreprise.Siret,
      telephone: devis.entreprise.Telephone,
      ville: devis.entreprise.Ville,
      titulaire: devis.banque.titulaire,
      iban: devis.banque.iban,
      bic: devis.banque.bic,
      date_devis: devis.Date_devis,
      date_val: devis.Date_validite,
      numero: devis.Numero,
      moyen_paiement: devis.mode,
      acompte: devis.acompte,
      logo: devis.logo
    })
    .returning('id')
    .then(devisId => {
      logger.info('[Knex] Données Devis enregistrées (id): %s', devisId);
      return devisId
    }).catch(error => logger.error('[Enregistrement Devis] Sauvegarde db %s', error))
};

livraisonSave = (livraison, sessid) => {
  return knex('livraison')
    .insert({
      livr_mode: livraison.mode,
      livr_service: livraison.service,
      livr_nom: livraison.firstName,
      livr_adresse: livraison.adresse,
      livr_ville: livraison.ville,
      livr_postal: livraison.codepostal,
      livr_pays: livraison.pays,
      operateur: livraison.operateur,
      userid: sessid,
    })
    .returning('id')
    .then(livraisonId => {
      logger.info('[Knex] Données Livraison enregistrées (id): %s', livraisonId[0]);
      return livraisonId
    }).catch(error => logger.error('[Livraison] Sauvegarde db %s', error))
};

cartSave = (panier, sessid) => {
  const saveProduct = panier.listeProduits.map((p, i) => {
    return knex('cart')
      .insert({
        pid: p.id,
        nom: p.nom,
        quantite: p.qte,
        prix: p.prix,
        reduction: panier.reduction,
        sous_total: p.qte * p.prix,
        fdp: 0,
        montant: panier.montantTotal,
        quantite_totale: panier.qteTotale,
        userid: sessid,
        hauteur: panier.hauteur,
        poids: panier.poids,
        unites: panier.unite
      })
      .returning('id')
      .then(cart => {
        return cart
      }).catch(error => logger.error('[Enregistrement panier] Sauvegarde db %s', error))
  });

  return Promise.all(saveProduct)
    .then(function(results) {
      logger.info('[Knex] Données Panier enregistrées (id): %s', results);
      return results
    })

};

saveCommandeInDB = (commande, panier, sessid) => {
  return knex('commande')
    .insert({
      userid: sessid,
      status: commande.status,
      mode: commande.mode,
      amount: panier.montantTotal,
      cardtype: commande.cardType,
      number: commande.maskedNumber,
      expirationdate: commande.expirationDate,
      transactionid: commande.id,
      date: Number(new Date()),
    })
    .returning('transactionid')
    .then(transactionid => {
      logger.info('[Knex] Transaction bancaire enregistrée: %s', transactionid);
      return transactionid
    }).catch((error) => logger.error('[Knex] Transaction non enregistrée %s', error));
};

saveOrderColis = (result, sessid) => {
  logger.debug('[Boxtal db] Sessid: %o', sessid);
  return knex('boxtal')
    .insert({
      userid: sessid,
      reference: result.order.shipment[0].reference[0],
      collection_date: result.order.shipment[0].collection_date,
      prix_boxtal: result.order.shipment[0].offer[0].price[0]['tax-inclusive'][0],
      livraison_date: result.order.shipment[0].offer[0].delivery[0].date[0],
      service: result.order.shipment[0].offer[0].operator[0]['label'][0],
      date_commande: Number(new Date())

    })
    .returning('reference')
    .then(reference => {
      logger.info('[Boxtal db] Commande de colis enregistrée: %s', reference);
      return reference
    }).catch((error) => logger.error('[Boxtal db] Commande de colis non enregistrée %s', error));
};


router.post('/enregistrement', function(req, res, next) {
  
  userSave(req.body, req.session.id)
    .then(user => {
      res.sendStatus(200);
    })
});

router.post('/saveCartOnDB', function(req, res, next) {
  cartSave(req.body, req.session.id)
    .then(cart => {
      res.sendStatus(200);
    })
});

router.post('/livraison', function(req, res, next) {
  
  livraisonSave(req.body, req.session.id)
    .then(livraison => {
      res.sendStatus(200);
    })
});

router.post('/devis', function(req, res, next) {
  userSave(req.body.formData.client, req.session.id)
    .then(user => {
      cartSave(req.body.panier, req.session.id)
        .then(cart => {
          devisSave(req.body.formData, req.session.id)
            .then(
              devis => {
                saveCommandeInDB(req.body.formData, req.body.panier, req.session.id)
                  .then(commande => {
                    res.send(commande)
                  })
              })
        })
    })
});

const resetsession = (req) => {
  req.session.destroy(function(err) {
    err ? logger.error('[Session] Erreur de suppression de session : %s', err) : logger.debug('[Session] Suppression effectuée');
  })
}

module.exports = router;
module.exports.saveCommandeInDB = saveCommandeInDB;
module.exports.saveOrderColis = saveOrderColis;
module.exports.sessionStore = sessionStore;
module.exports.resetsession = resetsession;
