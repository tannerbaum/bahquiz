"use strict";

module.exports = function(sequelize, datatypes) {
	var user = sequelize.define("user",{
	name : datatypes.STRING,
	pass : datatypes.STRING,
	totalscore : datatypes.INTEGER
}, {
        classMethods: {
            associate: function(models) {

            }
        }
    });
	
	return user;
}
