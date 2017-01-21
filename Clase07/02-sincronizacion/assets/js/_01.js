io.socket.get("/suscripcion", function(registros){
	console.log(registros)
})

io.socket.on("monitoreo", function(obj){
	console.log(obj)
})