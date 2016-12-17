var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var cookieSession = require("cookie-session")

var mongodb = require("mongodb"),
	db = require("monk")("localhost/bdredes")

var passport = require("passport"),
	passportFacebook = require("passport-facebook").Strategy

var index = require('./routes/index');
var redes = require('./routes/redes');

var app = express();

passport.serializeUser(function(usuario, done){
	done(null, usuario)
})

passport.deserializeUser(function(usuario, done){
	done(null, usuario)
})


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
app.use(cookieSession({secret: "abcde"}))

passport.use(
	new passportFacebook(
		{
			clientID: "369669430050138",
			clientSecret: "33f992823cfb148a7f2d13ecf261c618",
			callbackURL: "http://localhost:3000/redes/facebook/callback",
			profileFields: ["id", "displayName", "photos"]
		},
		function(accessToken, refreshToken, profile, done)
			var Usuarios = db.get("usuarios")

			Usuarios
				.find({idRedes: profile.id})
				.then(function(registros){
					if(registros.length == 0) {
						var datos = {
							idRedes: profile.id,
							nombre: profile.displayName,
							foto: profile.photos[0].value,
							proveedor: profile.provider
						}

						Usuarios
							.insert(datos)
							.then(function(registros){
								return done(null, datos)
							})
							.catch(function(err){
								return done(err)
							})
					} else {
						return done(null, registros[0])
					}
				})
				.catch(function(err){
					return done(err)
				})
		}
	)
)


app.use(passport.initialize())
app.use(passport.session())

app.use('/', index);
app.use('/redes', redes);




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
