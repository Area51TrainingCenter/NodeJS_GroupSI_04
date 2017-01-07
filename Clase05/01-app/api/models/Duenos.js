/**
 * Duenos.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "Duenos",
  connection: "miConexionMySQL",
  attributes: {

  	id: {
  		primaryKey: true,
  		type: "integer",
  		autoIncrement: true,
  		unique: true
  	},

  	nombre: "string",

  	apellido: "string",

  	sexo: {
  		type: "string",
  		enum:["hombre", "mujer"]
  	},

  	estadoCivil: {
  		type: "integer",
  		required: true
  	},

  	educacion: {
  		type:"string",
  		size: 50,
  		defaultsTo: "sin educación"
  	},

/*  	mascota: {
  		model: "Mascotas"
  	}*/

/*  	mascota: {
  		collection: "Mascotas",
  		via: "dueno"
  	}*/


  }
};

