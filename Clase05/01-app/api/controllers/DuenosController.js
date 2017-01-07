/**
 * DuenosController
 *
 * @description :: Server-side logic for managing duenos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	listar: function(req, res, next) {
		Duenos
			.find()
			.then(function(registros){
				res.json(registros)
			})
			.catch(function(err){
				res.serverError(err)
			})
	},

	insertar: function(req, res, next){
/*		var registro = {
			nombre: req.body.nombre,
			apellido: req.body.apellido,
			sexo: req.body.sexo,
			estadoCivil:req.body.estadoCivil,
			educacion: req.body.educacion
		}*/

		var registro = req.allParams()

		Duenos
			.create(registro)
			.then(function(registros){
				res.json(registros)
			})
			.catch(function(err){
				res.serverError(err)
			})
	},

	detallar: function(req, res, next) {
		var filtro = {id: req.params.id}

		Duenos
			// .find(filtro)
			.find()
			.where(filtro)
			.then(function(registros){
				res.json(registros)
			})
			.catch(function(err){
				res.serverError(err)
			})
	},

	actualizar: function(req, res, next){
		var registro = req.allParams()
		var filtro = {id: req.params.id}

		Duenos
			.update(filtro, registro)
			.then(function(registros){
				res.json(registros)
			})
			.catch(function(err){
				res.serverError(err)
			})
	},

	eliminar: function(req, res, next) {
		var filtro = {id: req.params.id}

		Duenos
			.destroy(filtro)
			.then(function(registros){
				res.json(registros)
			})
			.catch(function(err){
				res.serverError(err)
			})
	},

	listarPaginado: function(req, res, next) {
		var paginacion = {
			page: req.params.pagina,
			limit: req.params.tamano
		}

		Duenos
			.find()
			.paginate(paginacion)
			.then(function(registros){
				res.json(registros)
			})
			.catch(function(err){
				res.serverError(err)
			})
	},

	contar: function(req, res, next) {
		console.log("contar");
		Duenos
			.count()
			.then(function(cantidad){
				res.json(cantidad)
			})
			.catch(function(err){
				res.serverError(err)
			})
	}












	
};

