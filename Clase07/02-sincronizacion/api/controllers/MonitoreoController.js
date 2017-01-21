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
	}

	actualizar: function(){}






	
};

