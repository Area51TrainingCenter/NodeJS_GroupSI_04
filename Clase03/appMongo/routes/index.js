var express = require('express');
var router = express.Router();
var mongodb = require("mongodb")
var db = require("monk")("localhost/bd_colegio")

/* GET home page. */
router.get('/:pagina', function(req, res, next) {
  var Alumnos = db.get("alumnos")

  var pagina = req.params.pagina

  Alumnos
  	.find({}, {limit: 3, skip: 3*(pagina-1)})
  	.then(function(registros){
  		res.render("alumnos", {registros: registros})
  	})
  	.catch(function(err){
  		res.send(err)
  	})
});

module.exports = router;
