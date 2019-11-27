const express = require('express');
const path = require('path');
const compression = require('compression'); //gzip
const app = express();
const cors = require('cors');
const logger = require('./log/logger');
const morgan = require('morgan');
const config = require('./config');
const secret = config.jwtSecret;
const session = require('express-session');
const helmet = require('helmet');


//routes requiring
const saveInDB = require('./routes/saveInDB');
const getFromDB = require('./routes/getFromDB');
const paiement = require('./routes/paiement');
const sendMail = require('./routes/sendMail');
const facture = require('./routes/facture');
const boxtal = require('./routes/boxtal');
const auth = require('./routes/auth');

//middlewares

app.use(require("morgan")('tiny', {
  "stream": logger.stream
}));
app.use(helmet());
app.use(compression());
app.options('*', cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(session({
  secret: secret,
  cookie: {
    maxAge: 3600000, // 30min
  },
  store: saveInDB.sessionStore,
  resave: true,
  saveUninitialized: true,
}));
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));
app.use(express.static(path.join(__dirname, 'react/build')));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//routes

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
app.get('/resetsession', (req, res) => {
  saveInDB.resetsession(req);
  res.send('reset');
});




app.use('/saveInDB', saveInDB);
app.use('/paiement', paiement);
app.use('/getFromDB', getFromDB);
app.use('/sendMail', sendMail);
app.use('/facture', facture);
app.use('/boxtal', boxtal);
app.use('/auth', auth);

logger.warn('[Express] Port %d', process.env.PORT);

module.exports = app;
