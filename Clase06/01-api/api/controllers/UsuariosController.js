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
	}
	
};

