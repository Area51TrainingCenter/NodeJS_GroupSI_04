var cron = require("node-schedule")

var j = cron.scheduleJob('4 * * * *',function(){
	console.log("Se ejecuta en el minuto 4")
})

var j = cron.scheduleJob('*/1 * * * *',function(){
	console.log("Se ejecuta cada minuto")
	Correos.enviarTexto({to:"sergiohidalgocaceres@gmail.com", subject:"Correo desde un servicio", text: "Enviado desde un servicio"})
})

var j = cron.scheduleJob('*/1 * * * * *',function(){
	console.log("Se ejecuta cada segundo")
})

var j = cron.scheduleJob('* */1 * * *',function(){
	console.log("Se ejecuta cada hora")
})
