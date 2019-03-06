var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var cors = require('cors');
const fetch = require('node-fetch');
var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};
app.options('*', cors(corsOptions));

var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://quadratik.eu.auth0.com/.well-known/jwks.json"
    }),
    audience: 'http://localhost:3000/api',
    issuer: "https://quadratik.eu.auth0.com/",
    algorithms: ['RS256']
});

var request = require("request");

var options = { method: 'POST',
  url: 'https://quadratik.eu.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"vHVgmtxQDZVNW15Hz8rPVzLByGHZ9Vmj","client_secret":"LbTm6isIw1ww0iJd5NQ0qOYyxukph8sSklSBXShQh3c3N9tVrkHr8SNyxIMwS9DB","audience":"http://localhost:3000/api","grant_type":"client_credentials"}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  if(body) {
    console.log('[Auth0] Ok');
  };
});

console.log('[Express] Port',process.env.PORT);

var saveInDBRouter = require('./routes/saveInDB');
var getFromDB = require('./routes/getFromDB');
var paiementRouter = require('./routes/paiement');
var sendMail = require('./routes/sendMail');



//gestion des sessions

const environment = process.env.NODE_ENV || 'development'; // if something else isn't setting ENV, use development
const configuration = require('./config')[environment]; // require environment's settings from knexfile
const knex = require('knex')(configuration);

console.log('[Knex] Mode', environment);

const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const store = new KnexSessionStore({
  knex: knex,
  tablename: 'sessions' // optional. Defaults to 'sessions'

});


app.use(session({
  secret: 'mycatiscuteandyoudontcare',
  cookie: {
    maxAge: 1800000 // 30min
  },
  store: store,
  resave: false, //laissé sur false pour le panier
  saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'react/build')));

app.get('/guide', (req,res) =>{
    res.sendFile(path.join(__dirname+'/react/build/index.html'));
});
app.get('/shop', (req,res) =>{
    res.sendFile(path.join(__dirname+'/react/build/index.html'));
});
app.get('/commande', (req,res) =>{
    res.sendFile(path.join(__dirname+'/react/build/index.html'));
});
app.get('/quadralab', (req,res) =>{
    res.sendFile(path.join(__dirname+'/react/build/index.html'));
});



app.use('/saveInDB', saveInDBRouter);
app.use('/paiement', paiementRouter);
app.use('/getFromDB', getFromDB);
app.use('/sendMail', sendMail);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Io

const io = require('socket.io')();

io.on('connection', (client) => {
  console.log('Nouveau client [ID] :', client.id);
  client.on('clientServer', (messageRecu) => {
    fetch('http://localhost:3005/sendMail/quadraMessenger')
    .then(res => res.text())
    .then(body => console.log(body));
    client.broadcast.emit('Serverclient', messageRecu);
  });
});

const port = 8000;
io.listen(port);
console.log('[QuadraMessenger (Io)] Ecoute sur le port', port);



module.exports = app;
