
// Application Set Up
// ----------------------------------------------
var express  = require('express');
var app      = express();
var server   = require('http').Server(app);
var port     = process.env.PORT || 8080;

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var configDB = require('./config/database.js');
var io       = require('socket.io')(server);


// Configuration
// ----------------------------------------------
// mongoose.connect(configDB.url);
require('./config/passport')(passport);  // pass passport for configuration


// Express Set Up
// ----------------------------------------------
app.use(morgan('dev'));         // log every request to the console
app.use(cookieParser());        // read cookies (needed for auth)
app.use(bodyParser());          // get information from html forms
app.set('view engine', 'ejs');  // set up ejs for templating
app.set('views', __dirname + '/public/views');
// Do we need this?
app.use(express.static('public'));


// Authentication
// ----------------------------------------------
app.use(session({ secret: 'tusmadressonenmispantalones' }));     // session secret -- guessing we should hide this at some point?
app.use(passport.initialize());                                  // initialize passport
app.use(passport.session());                                     // persistent login sessions
app.use(flash());                                                // use connect-flash for flash messages stored in session


// Socket.io Setup
// ----------------------------------------------
io.sockets.on('connection', function(socket) {

  socket.on('setNick', function(data) {
    socket['nick'] = data;
  });

  socket.on('message', function (message) {
    socket.broadcast.emit('message', {
      'message' : message,
      'nick' : socket['nick']
    });
  });

});

// io.sockets.on('connection', function (socket) {
//   socket.on('setPseudo', function (data) {
//     socket['pseudo'] = data;
//   });
//   socket.on('message', function (message) {
//     socket.broadcast.emit('message', {
//       'message' : message,
//       'pseudo' : socket['pseudo']
//     });
//   });
// });

// Routes
// ----------------------------------------------
require('./app/routes.js')(app, passport);  // load our routes and pass in our app and fully configured passport


// Server
// ----------------------------------------------
server.listen(port);
console.log('The magic happens on port ' + port);
