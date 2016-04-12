"use strict";

module.exports = function(sequelize, datatypes) {
	var module = sequelize.define("module",{
	name : datatypes.STRING,
	description: datatypes.STRING,
	thumbpic : datatypes.STRING
}, {
        classMethods: {
            associate: function(models) {
				//onDelete : "Cascade";

            }
        }
    });
	
	return module;
}
