/**
 * MonitoreoController
 *
 * @description :: Server-side logic for managing monitoreos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	suscripcion: function(req, res, next){
		Monitoreo
			.find()
			.then(function(registros){
				if(req.isSocket){
					console.log("suscrito")
					Monitoreo.subscribe(req, registros)
					Monitoreo.watch(req)
					res.json(registros)
				}


			})
			.catch(function(err){
				res.negotiate(err)
			})
	},

	actualizar: function(req, res, next){
		var filtro = {id: req.params.id}
		var registro = req.allParams()

		Monitoreo
			.update(filtro, registro)
			.then(function(registros){
				Monitoreo.publishUpdate(registros[0].id, registros[0])
				res.ok()
			})
			.catch(function(err){
				res.negotiate(err)
			})

	}






	
};

