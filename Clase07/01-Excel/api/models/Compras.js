/**
 * Compras.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	id: {
  		type:"integer",
  		primaryKey: true,
  		autoIncrement: true,
  		unique: true
  	},

  	producto: "string",

  	cantidad: "integer"

  }
};

