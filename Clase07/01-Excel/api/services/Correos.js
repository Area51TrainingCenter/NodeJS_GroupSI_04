var mailgun = require("mailgun-js")

var apiKey = "key-5752542242109c4a7436ae9214823083",
	dominio = "sandboxebaecba4b1e841b582954f750a71bf99.mailgun.org"
var enviador = mailgun({apiKey: apiKey, domain: dominio})	

module.exports = {

	enviarTexto: function(datos){
		var data = {
					from: "shidalgo@tibajodemanda.com",
					to: datos.to,
					subject: datos.subject,
					text: datos.text
				}

		enviador.messages().send(data, function(err, body){
			if(err){
				console.log(err)
				console.log("error desde mailgun")
			} else {
				console.log("Correo enviado")
			}
		})
	}

}