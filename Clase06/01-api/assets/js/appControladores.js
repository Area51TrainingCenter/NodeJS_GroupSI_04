app.controller("controlador",["http", function(http){

	this.alumnos = []

	var self = this

	http
		.listar()
		.then(function(registros){
			self.alumnos = registros.data
		})
		.catch(function(err){
			console.log(err)
		})

}])