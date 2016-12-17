var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var cookieSession = require("cookie-session")

var passport = require("passport"),
	passportLocal = require("passport-local")

var mongodb = require("mongodb"),
	db = require("monk")("localhost/mibd")

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

passport.serializeUser(function(usuario, done){
	done(null, usuario._id)
})

passport.deserializeUser(function(usuarioId, done){
	var Usuarios = db.get("usuarios")

	Usuarios
		.find({_id: usuarioId})
		.then(function(registros){
			if(registros.length==0) {
				done(null, false)
			} else {
				done(null, registros[0])
			}
		})
		.catch(function(err){
			done(err)
		})
})

passport.use(
	new passportLocal(
		{
			usernameField: "usuario",
			passwordField: "contrasena"
		},
		function(usuario, contrasena, done){
			var Usuarios = db.get("usuarios")

			Usuarios
				.find({usuario: usuario, contrasena:contrasena})
				.then(function(registros){
					if(registros.length==0) {
						 done(null, false)
					} else {
					 done(null, registros[0])
					}
				})
				.catch(function(err){
					return done(err)
				})
			// done(err)
			// done(null, false)
			// done(null, {id: 50, nombre: "Sergio"})

		}
	)
)


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({secret: "abcdef"}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
