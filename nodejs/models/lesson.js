"use strict";

module.exports = function(sequelize, datatypes) {
	var lesson = sequelize.define("lesson",{
	name : datatypes.STRING,
	description : datatypes.STRING,
	number : datatypes.INTEGER
}, {
        classMethods: {
            associate: function(models) {
				lesson.belongsTo(models.module);
            }
        }
    });
	
	return lesson;
}
