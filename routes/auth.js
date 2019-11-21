var express = require('express');
var router = express.Router();
const fromDb = require('./getFromDB');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const logger = require('../log/logger');
const config = require('../config'); // require environment's settings from knexfile

const secret = config.jwtSecret;


//creation du token
router.post('/login', (req, res, next) => {
  console.log(req.body);
  fromDb.adminQuery(req.body.email)
    .then(adminUser => {
      adminUser.length ?
        bcrypt.compare(req.body.password, adminUser[0].hashpwd).then(function(valide) {
          if (valide) {
            const userData = adminUser[0];
            jwt.sign({
              userData
            }, 'mycatiscuteandyoudontcare', {
              expiresIn: '30m'
            }, (err, token) => {
              res.json({
                token
              });
            });
          } else {
            logger.warn('[Auth] Mot de passe incorrect');
            res.sendStatus(403);
          }
        }) : logger.error('[Auth] Aucun utilisateur retrouvé');
    })
});

router.post('/signIn', (req, res, next) => { //a finir
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      console.log(hash);
    });
  });
});

router.get('/checkToken', verifyToken, (req, res) => {
  res.json(req.authData);
});


//Middleware de vérification de présence du token
// Le Format du token :
// Authorization: Bearer <access_token>
function verifyToken(req, res, next) {
  // Get auth header value
  const bearer = req.query.admin_token;
  // Check if bearer is undefined
  if (typeof bearer !== 'undefined') {
    logger.info('[Auth] Vérification du token suivant: %s', bearer);
    jwt.verify(bearer, secret, (err, authData) => {
      if (err) {
        err.name === 'TokenExpiredError' ? logger.warn('[Auth] Session admin expirée (renouvellement token demandé)') : logger.error('[Auth] Token invalidé %s', err);
        res.json(err);
      } else {
        logger.debug('[Auth] Token validé pour l\'utilisateur: %s', authData.userData.user);
        req.authData = authData.userData;
        next();
      }
    });

  } else {
    // Forbidden
    logger.error('[Auth] Token inexistant');
    res.sendStatus(403);
  }

}


module.exports = router;
