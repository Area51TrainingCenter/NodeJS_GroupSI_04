app.factory("http", ["$http", function(http){
	var obj = {}

	obj.listar = function(){
		return http.get("http://localhost:1337/usuarios")
	}

	return obj
}])