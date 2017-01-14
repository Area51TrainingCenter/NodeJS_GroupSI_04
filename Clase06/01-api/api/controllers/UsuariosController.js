/**
 * UsuariosController
 *
 * @description :: Server-side logic for managing usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	listar: function(req, res){
		Usuarios
			.find()
			.then(function(registros){
				res.json(registros)
			})
			.catch(function(err){
				res.negotiate(err)
			})
	},

	detallar: function(req, res){
		var filtro = {idUsuario: req.params.id}

		Usuarios
			.find()
			.where(filtro)
			.then(function(registros){
				res.json(registros)
			})
			.catch(function(err){
				res.negotiate(err)
			})
	},

	insertar: function(req, res){
		var registro = req.allParams()

		Usuarios
			.create(registro)
			.then(function(registros){
				res.json(registros)
			})
			.catch(function(err){
				res.negotiate(err)
			})
	},

	actualizar: function(req, res){
		var registro = req.allParams()
		var filtro = {idUsuario: req.params.id}

		Usuarios
			.update(filtro, registro)
			.then(function(registros){
				res.json(registros)
			})
			.catch(function(err){
				res.negotiate(err)
			})
	},

	eliminar: function(req, res){
		var filtro = {idUsuario: req.params.id}

		Usuarios
			.destroy(filtro)
			.then(function(registros){
				res.json(registros)
			})
			.catch(function(err){
				res.negotiate(err)
			})
	}

	
};

