var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var cookieSession = require("cookie-session")

var passport = require("passport"),
	passportLocal = require("passport-local")

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

passport.serializeUser(function(usuario, done){
	done(null, usuario.id)
})

passport.deserializeUser(function(usuario, done){
	done(null, {id: 50, nombre:"sergio"})
})

passport.use(
	new passportLocal(
		{
			usernameField: "usuario",
			passwordField: "contrasena"
		},
		function(usuario, contrasena, done){

			if(usuario=="sergio" && contrasena=="123") {
				return done(null, {id: 50, usuario: usuario})
			} else {
				return done(null, false)
			}
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
