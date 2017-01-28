var app = angular.module("app", [])

app.controller("ambulancias", ["$scope", function($scope){
/*	this.lista = [
		{id: 1, medico: "medico1", piloto: "piloto1", paramedico: "paramedico1"},
		{id: 2, medico: "medico2", piloto: "piloto2", paramedico: "paramedico2"},
		{id: 3, medico: "medico3", piloto: "piloto3", paramedico: "paramedico3"},
		{id: 4, medico: "medico4", piloto: "piloto4", paramedico: "paramedico4"},
		{id: 5, medico: "medico5", piloto: "piloto5", paramedico: "paramedico5"},
		{id: 6, medico: "medico6", piloto: "piloto6", paramedico: "paramedico6"},
		{id: 7, medico: "medico7", piloto: "piloto7", paramedico: "paramedico7"},
		{id: 8, medico: "medico8", piloto: "piloto8", paramedico: "paramedico8"},
		{id: 9, medico: "medico9", piloto: "piloto9", paramedico: "paramedico9"}
	]*/

	this.lista = []

	var self = this

	io.socket.get("/suscripcion", function(registros){
		$scope.$apply(function(){
			self.lista = registros	
		})
		console.log(registros)
	})

	io.socket.on("monitoreo", function(obj){
		console.log(obj)
		$scope.$apply(function(){
			switch(obj.verb) {
				case "updated":
					self.lista.forEach(function(registro){
						if(registro.id==obj.id) {
							registro.medico = obj.data.medico
							registro.piloto = obj.data.piloto
							registro.paramedico = obj.data.paramedico
						}
					})
					break
				case "created":
					self.lista.push(obj.data)
					break
				case "destroyed":
					var ind = -1

					self.lista.forEach(function(elem, indice){
						if(elem.id == obj.id) ind = indice
					})

					self.lista.splice(ind, 1)
			}
		})
	})


}])




