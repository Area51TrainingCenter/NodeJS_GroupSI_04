/**
 * FotosController
 *
 * @description :: Server-side logic for managing fotos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	publicar: function(req, res, next){
		req.file("archivo").upload({
			dirname:  "../../assets/uploads"
		},function(err, obj){
			if(err){
				res.negotiate(err)
			} else {
				console.log(obj)
				res.ok()
			}
		})
	}
	
};

