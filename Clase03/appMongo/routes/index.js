var express = require('express');
var router = express.Router();
var mongodb = require("mongodb")
var db = require("monk")("localhost/bd_colegio")
var tamanoPagina = 3

/* GET home page. */
router.get('/:pagina', function(req, res, next) {
  var Alumnos = db.get("alumnos")

  var pagina = req.params.pagina
  var cantidadPaginas

  Alumnos
  	.count()
  	.then(function(cantidadRegistros){
  		cantidadPaginas = Math.floor(cantidadRegistros / tamanoPagina)
  		if(cantidadRegistros % tamanoPagina > 0) cantidadPaginas++

  		return Alumnos.find({}, {limit: tamanoPagina, skip: tamanoPagina*(pagina-1)})
  	})
  	.then(function(registros){
  		res.render("alumnos", {registros: registros, cantidadPaginas: cantidadPaginas, pagina: pagina})
  	})
  	.catch(function(err){
  		res.send(err)
  	})

});

module.exports = router;
