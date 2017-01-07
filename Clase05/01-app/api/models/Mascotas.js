/**
 * Mascotas.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "Mascotas",
  attributes: {
  	idMascota: {
  		primaryKey: true,
  		autoIncrement: true,
  		type: "integer",
  		unique: true
  	},

  	nombre: "string",

/*  	dueno: {
  		collection: "Duenos",
  		via: "mascota"
  	}*/

/*  	dueno: {
  		model: "Duenos"
  	}*/

  }
};

