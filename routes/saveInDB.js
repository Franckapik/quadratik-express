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
          }).catch(error => logger.error('[Erreur Enregistrement ' + table + '] Sauvegarde db %s', error))
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
    entreprise: devis.coordonnées.entreprise.Nom_entreprise,
    code_postal: devis.coordonnées.entreprise.Code_postal,
    mail: devis.coordonnées.entreprise.Mail,
    adresse: devis.coordonnées.entreprise.Adresse,
    pays: devis.coordonnées.entreprise.Pays,
    siret: devis.coordonnées.entreprise.Siret,
    telephone: devis.coordonnées.entreprise.Telephone,
    ville: devis.coordonnées.entreprise.Ville,
    titulaire: devis.parametres.banque.titulaire,
    iban: devis.parametres.banque.iban,
    bic: devis.parametres.banque.bic,
    date_devis: devis.parametres.autres.Date_devis,
    date_val: devis.parametres.autres.Date_validite,
    numero: devis.Numero,
    moyen_paiement: devis.parametres.autres.mode,
    acompte: devis.parametres.autres.acompte,
    logo: devis.parametres.autres.logo
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

cartDelete = (sessid) => {
  return knex('cart')
    .where({
      'userid': sessid
    })
    .del()
}

cartSave = (panier, sessid) => {
  cartDelete(sessid)
    .then(
      rowsDeleted => {
        if (rowsDeleted) {
          logger.info('[Knex] Table cart [produits supprimés] %s', rowsDeleted);
        }
      }
    )
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
    return upsert('cart', {
      userid: sessid, nom : data.nom
    }, sessid, data, 'id');
  })

  return Promise.all(saveProduct)
    .then(results => {return results})
};

saveCommandeInDB = (commande, amount, sessid) => {
  let orderid;
  if (commande.metadata) {
    orderid = commande.metadata.orderid
  } else {
    orderid = Number(new Date());
  }
  const data = {
    userid: sessid,
    status: commande.status,
    mode: commande.mode,
    method: commande.method,
    profileid: commande.profileId,
    amount: amount,
    orderid: orderid,
    expirationdate: commande.expiresAt,
    transactionid: commande.id,
    date: Number(new Date()),
  }

  return upsert('commande', {
    userid: sessid
  }, sessid, data, 'id');

};

saveOrderColis = (result, sessid) => {
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
  let sessid = 'null';
  if (req.body.sessid) { // modification de devis
    sessid = req.body.sessid
  } else { //creation de devis
    sessid = req.sessionID
  }

  const commande = {
    userid: sessid,
    status: req.body.formData.parametres.autres.status,
    mode: "devis",
    method: req.body.formData.parametres.autres.mode,
    expirationdate: req.body.formData.parametres.autres.Date_validite,
    date: Number(new Date()),
  }

  userSave(req.body.formData.coordonnées.client, sessid)
    .then(user => {
      cartSave(req.body.panier, sessid)
        .then(cart => {
          devisSave(req.body.formData, sessid)
            .then(
              devis => {
                saveCommandeInDB(commande, req.body.panier.montantTotal, sessid)
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
