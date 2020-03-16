var express = require('express');
var router = express.Router();
const environment = process.env.NODE_ENV || 'development'; // if something else isn't setting ENV, use development
const configuration = require('../config')[environment]; // require environment's settings from knexfile
const knex = require('knex')(configuration);
const logger = require('../log/logger');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

logger.warn('[Knex] Mode %s', environment);

const upsert = (table, where, sessid, data, returned) => {
  return knex.select('*')
    .groupBy(returned)
    .from(table)
    .where(where)
    .count()
    .then((count) => {
      if (count == 0) {
        return knex(table)
          .insert(data)
          .returning(returned)
          .then(id => {
            logger.info('[Knex] Table ' + table + ' Données enregistrées (id): %s', id[0]);
            return id
          }).catch(error => logger.error('[Erreur Enregistrement ' + table +'] Sauvegarde db %s', error))
      } else {
        return knex(table)
          .where(where)
          .update(data)
          .returning(returned)
          .then(id => {
            logger.info('[Knex] Table ' + table + ': Données mise à jour (id): %s', id[0]);
            return id
          }).catch(error => logger.error('[Knex] Erreur sur la table ' + table + ' %s', error))
      }
    });
}

//enregistrement des sessions Express

const sessionStore = new KnexSessionStore({
  knex,
  tablename: 'sessions', // optional. Defaults to 'sessions'
});

userSave = (user, sessid) => {
  const data = {
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
  }
  return upsert('user', {
    userid: sessid
  }, sessid, data, 'id');
};

devisSave = (devis, sessid) => {
  const data = {
    userid: sessid,
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
  }

  return upsert('devis', {
    userid: sessid
  }, sessid, data, 'id');

};

livraisonSave = (livraison, sessid) => {
  const data = {
    livr_mode: livraison.mode,
    livr_service: livraison.service,
    livr_nom: livraison.firstName,
    livr_adresse: livraison.adresse,
    livr_ville: livraison.ville,
    livr_postal: livraison.codepostal,
    livr_pays: livraison.pays,
    operateur: livraison.operateur,
    userid: sessid,
  };
  return upsert('livraison', {
    userid: sessid
  }, sessid, data, 'id');
};

cartSave = (panier, sessid) => {
  console.log(panier);
  const saveProduct = panier.listeProduits.map((p, i) => {
    const data = {
      pid: p.id,
      cartid: panier.cartid,
      nom: p.nom,
      quantite: p.qte,
      prix: p.prix,
      reduction: panier.reduction,
      sous_total: p.qte * p.prix,
      fdp: panier.fdp,
      montanttotal: panier.montantTotal,
      montanthorsfdp: panier.montantHorsFdp,
      quantite_totale: panier.qteTotale,
      userid: sessid,
      hauteur: panier.hauteur,
      poids: panier.poids,
      unites: panier.unite,
      nbcolis: panier.nbColis
    }
    console.log(data.nom);

    return upsert('cart', { userid: sessid, nom: data.nom, cartid: panier.cartid}, sessid, data, 'id');

})

return Promise.all(saveProduct)
  .then(function(results) {
    return results
  })
};

saveCommandeInDB = (commande, amount, sessid) => {

  const data = {
    userid: sessid,
    status: commande.status,
    mode: commande.mode,
    method: commande.method,
    profileid: commande.profileId,
    amount: amount,
    orderid: commande.metadata.orderId,
    expirationdate: commande.expiresAt,
    transactionid: commande.id,
    date: Number(new Date()),
  }

  return upsert('commande', {
    userid: sessid
  }, sessid, data, 'id');

};

saveOrderColis = (result, sessid) => {
  console.log(result);
  const data = {
    userid: sessid,
    reference: result.order.shipment[0].reference[0],
    collection_date: result.order.shipment[0].collection_date,
    prix_boxtal: result.order.shipment[0].offer[0].price[0]['tax-inclusive'][0],
    livraison_date: result.order.shipment[0].offer[0].delivery[0].date[0],
    service: result.order.shipment[0].offer[0].operator[0]['label'][0],
    date_commande: Number(new Date())
  }

  return upsert('boxtal', {
    userid: sessid
  }, sessid, data, 'reference');
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
