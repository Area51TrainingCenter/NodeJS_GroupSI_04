app.controller("controlador",["http", function(http){

	this.alumnos = []
	this.alumno = {}

	var self = this

	http
		.listar()
		.then(function(registros){
			self.alumnos = registros.data
			self.alumnos.forEach(function(alumno){
				alumno.editando = false
			})
		})
		.catch(function(err){
			console.log(err)
		})

	this.detallar = function(registro) {
		http
			.detallar(registro.idUsuario)
			.then(function(registros){
				self.alumno = registros.data[0]
			})
			.catch(function(err){
				console.log(err)
			})
	},

	this.insertar = function(nombre){
		var data = {nombre: nombre}
		http
			.insertar(data)
			.then(function(registros){
				return http.listar()
			})
			.then(function(registros){
				self.alumnos = registros.data
				self.alumnos.forEach(function(alumno){
					alumno.editando = false
				})
			})
			.catch(function(err){
				console.log(err)
			})		
	},

	this.actualizar = function(registro){
		var data = {nombre: registro.nombre}

		http
			.actualizar(data, registro.idUsuario)
			.then(function(registros){
				return http.listar()
			})
			.then(function(registros){
				self.alumnos = registros.data
				self.alumnos.forEach(function(alumno){
					alumno.editando = false
				})
			})
			.catch(function(err){
				console.log(err)
			})		
	},

	this.eliminar = function(registro){

		if(!confirm("¿Esta seguro de querer eliminar?"))  return


		http
			.eliminar(registro.idUsuario)
			.then(function(registros){
				return http.listar()
			})
			.then(function(registros){
				self.alumnos = registros.data
				self.alumnos.forEach(function(alumno){
					alumno.editando = false
				})
			})
			.catch(function(err){
				console.log(err)
			})		
	}









}])