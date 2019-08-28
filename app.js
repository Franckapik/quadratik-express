const createError = require('http-errors');
const express = require('express');
const path = require('path');
/*const logger = require('morgan');*/
//compression gzip
const compression = require('compression');
const app = express();
const cors = require('cors');
const env = process.env.NODE_ENV;
const logger = require('./log/logger');
const morgan = require('morgan');

logger.stream = {
    write: function(message, encoding){
        logger.verbose(message);
    }
};

app.use(require("morgan")('tiny', { "stream": logger.stream }));

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

const helmet = require('helmet');
app.use(helmet());
app.use(compression());
app.options('*', cors(corsOptions));

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://quadratik.eu.auth0.com/.well-known/jwks.json',
  }),
  audience: 'http://localhost:3000/api',
  issuer: 'https://quadratik.eu.auth0.com/',
  algorithms: ['RS256'],
});

const request = require('request');

const options = {
  method: 'POST',
  url: 'https://quadratik.eu.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"vHVgmtxQDZVNW15Hz8rPVzLByGHZ9Vmj","client_secret":"LbTm6isIw1ww0iJd5NQ0qOYyxukph8sSklSBXShQh3c3N9tVrkHr8SNyxIMwS9DB","audience":"http://localhost:3000/api","grant_type":"client_credentials"}',
};

request(options, (error, response, body) => {
  if (error) throw new Error(error);
  if (body) {
    logger.info('[Auth0] Ok');
  }
});

logger.info('[Express] Port %d', process.env.PORT);

const saveInDBRouter = require('./routes/saveInDB');
const getFromDB = require('./routes/getFromDB');
const paiementRouter = require('./routes/paiement');
const sendMail = require('./routes/sendMail');
const facture = require('./routes/facture');
const boxtal = require('./routes/boxtal');


// gestion des sessions

const environment = env|| 'development'; // if something else isn't setting ENV, use development
const configuration = require('./config')[environment]; // require environment's settings from knexfile
const knex = require('knex')(configuration);

logger.info('[Knex] Mode %s', environment);

const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const store = new KnexSessionStore({
  knex,
  tablename: 'sessions', // optional. Defaults to 'sessions'

});


app.use(session({
  secret: 'mycatiscuteandyoudontcare',
  cookie: {
    maxAge: 3600000, // 30min
  },
  store,
  resave: true, // laissé sur false pour le panier
  saveUninitialized: true,
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(logger('dev')); //ligne à reconsiderer/comprendre.
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));
app.use(express.static(path.join(__dirname, 'react/build')));

app.get('/guide', (req, res) => {
  res.sendFile(path.join(`${__dirname}/react/build/index.html`));
});
app.get('/shop', (req, res) => {
  res.sendFile(path.join(`${__dirname}/react/build/index.html`));
});
app.get('/commande', (req, res) => {
  res.sendFile(path.join(`${__dirname}/react/build/index.html`));
});
app.get('/quadralab', (req, res) => {
  res.sendFile(path.join(`${__dirname}/react/build/index.html`));
});
app.get('/callback', (req, res) => {
  res.sendFile(path.join(`${__dirname}/react/build/index.html`));
});
app.get('/admin', (req, res) => {
  res.sendFile(path.join(`${__dirname}/react/build/index.html`));
});


app.use('/saveInDB', saveInDBRouter);
app.use('/paiement', paiementRouter);
app.use('/getFromDB', getFromDB);
app.use('/sendMail', sendMail);
app.use('/facture', facture);
app.use('/boxtal', boxtal);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
