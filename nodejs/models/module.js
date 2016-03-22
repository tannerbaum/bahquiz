"use strict";

module.exports = function(sequelize, datatypes) {
	var module = sequelize.define("module",{
	name : datatypes.STRING,
	description: datatypes.STRING
}, {
        classMethods: {
            associate: function(models) {

            }
        }
    });
	
	return module;
}
