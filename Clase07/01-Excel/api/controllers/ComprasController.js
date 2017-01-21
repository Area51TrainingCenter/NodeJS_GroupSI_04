/**
 * ComprasController
 *
 * @description :: Server-side logic for managing compras
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var excel = require("msexcel-builder")
var mailgun = require("mailgun-js")

var apiKey = "pubkey-f3d74af8ef9c44d04ee9ad183bf9d5f3",
	dominio = "sandboxebaecba4b1e841b582954f750a71bf99.mailgun.org"
var enviador = mailgun({apiKey: apiKey, domain: dominio})	

module.exports = {

	exportar: function(req, res, next) {
		// var libro = require("msexcel-builder").createWorkbook()
		var libro = excel.createWorkbook()

		Compras
			.find()
			.then(function(registros){
				var hoja = libro.createSheet("Lista", 5, registros.length+1)
				hoja.set(1, 1, "ID")
				hoja.set(2, 1, "Producto")
				hoja.set(3, 1, "Cantidad")
				hoja.set(4, 1, "Fecha Creación")
				hoja.set(5, 1, "Fecha Actualización")

				var contador = 1
				registros.forEach(function(reg){
					contador++
					hoja.set(1, contador, reg.id)
					hoja.set(2, contador, reg.producto)
					hoja.set(3, contador, reg.cantidad)
					hoja.set(4, contador, reg.createdAt)
					hoja.set(5, contador, reg.updatedAt)
				})


				libro.generate(function(err, jszip){
					if(err){
						res.negotiate(err)
					} else {
						var buffer = jszip.generate({type: "nodebuffer"})

						res.setHeader('Content-disposition', 'attachment; filename=compras.xlsx')
						res.writeHead(200, {"content-type":"application/vdn.openxmlformats"})
						res.end(buffer)
					}

				})

			})
			.catch(function(err){
				res.negotiate(err)
			})
	},

	crear: function(req, res, next) {
		var libro = excel.createWorkbook('./misexcels','excel-generado.xlsx')

		Compras
			.find()
			.then(function(registros){
				var hoja = libro.createSheet("Lista", 5, registros.length+1)
				hoja.set(1, 1, "ID")
				hoja.set(2, 1, "Producto")
				hoja.set(3, 1, "Cantidad")
				hoja.set(4, 1, "Fecha Creación")
				hoja.set(5, 1, "Fecha Actualización")

				var contador = 1
				registros.forEach(function(reg){
					contador++
					hoja.set(1, contador, reg.id)
					hoja.set(2, contador, reg.producto)
					hoja.set(3, contador, reg.cantidad)
					hoja.set(4, contador, reg.createdAt)
					hoja.set(5, contador, reg.updatedAt)
				})

				libro.save(function(err){
					if(err) {
						res.negotiate(err)
					} else {
						res.ok()
					}
				})


			})
			.catch(function(err){
				res.negotiate(err)
			})
	},

	enviarTexto: function(req, res, next){
		var data = {
			from: "shidalgo@tibajodemanda.com",
			to: "sergiohidalgocaceres@gmail.com",
			subject: "Correo de prueba",
			text: "Este es un correo de prueba."
		}

		enviador.messages().send(data, function(err, body){
			if(err){
				res.negotiate(err)
			} else {
				res.send("Ok. El correo fue enviando.")
			}
		})
	}


	
};

