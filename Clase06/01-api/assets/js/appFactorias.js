app.factory("http", ["$http", function(http){
	var obj = {}

	obj.listar = function(){
		return http.get("http://localhost:1337/usuarios")
	},

	obj.detallar = function(id){
		return http.get("http://localhost:1337/usuarios/" + id)
	},

	obj.insertar = function(registro) {
		return http.post("http://localhost:1337/usuarios", registro)
	},

	obj.actualizar = function(registro, id){
		return http.put("http://localhost:1337/usuarios/" + id, registro)
	},

	obj.eliminar = function(id) {
		return http.delete("http://localhost:1337/usuarios/" + id)
	}

	return obj
}])