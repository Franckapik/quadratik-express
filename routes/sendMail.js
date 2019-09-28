var express = require('express');
var router = express.Router();
var config = require('../config');
var facture = require('./facture');
const fromDb = require('./getFromDB');



const environment = process.env.NODE_ENV || 'development'; // if something else isn't setting ENV, use development
const configuration = require('../config')[environment]; // require environment's settings from knexfile
const knex = require('knex')(configuration);


var nodemailer = require('nodemailer');

function quadraMessenger(messageRecu) {

  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(config.mail);

    // setup email data with unicode symbols
    let mailOptions = {
      from: 'QuadraMessenger', // sender address
      to: 'atelier@quadratik.fr', // list of receivers
      subject: '[Message envoyé via QuadraMessenger]', // Subject line
      text: 'Reponse demandée à la phrase suivante:' + messageRecu // plain text body
      //html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return logger.error(error);
      }

    });
  });

};





router.post('/mailcontact', function(req, res, next) {

  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(config.mail);

    // setup email data with unicode symbols
    let mailOptions = {
      from: req.body.lastName + '<foo@example.com>', // sender address
      to: 'atelier@quadratik.fr', // list of receivers
      subject: '[ ' + req.body.email + ' ]' + '[ ' + req.body.superficie + ' ]' + ' Mail Quadratik.fr', // Subject line
      text: req.body.message // plain text body
      //html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.json({
          error: error
        });
      } else {
        res.json({
          success: 'Votre message a bien été envoyé! Nous allons vous envoyer prochainement une réponse à l adresse mail indiquée !'
        })
      }
    });
  });

});

router.post('/questionnaire', function(req, res, next) {

  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(config.mail);

    // setup email data with unicode symbols
    let mailOptions = {
      from: req.body.lastName + '<foo@example.com>', // sender address
      to: 'atelier@quadratik.fr', // list of receivers
      subject: '[ ' + req.body.email + ' ]' + ' Formulaire de traitement acoustique', // Subject line
      html: '<p>' + 'Longueur de pièce :' + req.body.longueur + '</p>' +
        '<p>' + 'Largeur de pièce :' + req.body.largeur + '</p>' +
        '<p>' + 'Hauteur de pièce :' + req.body.hauteur + '</p>' +
        '<p>' + 'Utilisation de la pièce :' + req.body.utilisation + '</p>' +
        '<p>' + 'Traitement souhaité :' + req.body.traitement_souhait + '</p>' +
        '<p>' + 'Acoustique indésirable :' + req.body.traitement_indesirable + '</p>' +
        '<p>' + 'Traiement existant :' + req.body.traitement_existant + '</p>' +
        '<p>' + 'Produits convoités :' + req.body.traitement_interet + '</p>' +
        '<p>' + 'Budget prévisionel :' + req.body.budget + '</p>' +
        '<p>' + 'Niveau de traitement souhaité :' + req.body.traitement_type + '</p>' +
        '<p>' + 'Personalisation des produits :' + req.body.traitement_perso + '</p>' +
        '<p>' + 'Autre message :' + req.body.autres + '</p>'
      // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.json({
          error: error
        });
      } else {
        res.json({
          success: 'Votre description de pièce nous a bien été transmise! Nous allons étudier votre situation et vous envoyer prochainement une réponse à l adresse mail indiquée !'
        })
      }
    });
  });

});

router.post('/newsletter', function(req, res, next) {

  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(config.mail);

    // setup email data with unicode symbols
    let mailOptions = {
      from: req.body.lastName + '<foo@example.com>', // sender address
      to: 'atelier@quadratik.fr', // list of receivers
      subject: '[ ' + req.body.email + ' ]' + ' Abonnement à la Newsletter', // Subject line
      text: '[Abonnement demandé pour la Newsletter Quadratik.fr]' // plain text body
      //html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.json({
          error: error
        });
      } else {
        res.json({
          success: 'Vous êtes inscrit à la Newsletter de Quadratik.fr ! :)'
        })
      }
    });
  });

});

router.get('/mailfacture', function(req, res, next) {

  console.log('ici', req.sessionID);

  knex('user')
    .where('userid', req.sessionID)
    .then(user => {
      knex('cart')
        .where('userid', req.sessionID)
        .then(cart => {
          knex('commande')
            .where('userid', req.sessionID)
            .then(commande => {
              knex('livraison')
                .where('userid', req.sessionID)
                .then(livraison => {
                  facture.facturation(user, cart, commande, livraison).then(result => console.log(result))

                  nodemailer.createTestAccount((err, account) => {
                    console.log(user[user.length - 1].mail);
                    let transporter = nodemailer.createTransport(config.mail);
                    let mailOptions = {
                      from: user[user.length - 1].mail, // sender address
                      to: 'contact@quadratik.fr', // list of receivers
                      subject: 'Votre commande Quadratik.fr', // Subject line
                      html: 'Bonjour </br> Votre commande chez Quadratik.fr à bien été enregistrée! </br> Nous allons vous tenir informé de son expédition. </br> Transaction N° :' + commande.transactionid + '</br> Total: €', // plain text body
                      /*attachments: [{
                        filename: 'commande.pdf',
                        path: '../factures/commande.pdf',
                        contentType: 'application/pdf'
                      }]*/
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                      if (error) {
                        res.json({
                          error: error
                        });
                      } else {
                        res.json({
                          success: 'Facture envoyée par mail au client! :)'
                        })
                      }
                    });
                  });
                })
            })
        })
    })
    .catch(error => logger.error(error));
});

router.get('/confirmationCommande', function(req, res, next) {

  fromDb.userQuery(req.query.sessid).then(
    user => {
      console.log(user);
      const expediteur = 'atelier@quadratik.fr'

        const Email = require('email-templates');

        const email = new Email({
          message: {
            from: expediteur
          },
          // uncomment below to send emails in development/test env:
          send: true,
          transport: {
            jsonTransport: true
          }
        });

        email
          .send({
            template: 'mars',
            message: {
              to: user.mail
            },
            locals: {
              nom: user.nom,
              prenom: user.prenom,
              adresse: user.adresse,
              mail: user.mail

            },
            preview: {
          open: {
            app: 'firefox',
            wait: false
          }
        }
          })
          .then(console.log)
          .catch(console.error);
    }
  )


});





module.exports = router;
module.exports.quadraMessenger = quadraMessenger;
