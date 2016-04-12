"use strict";

module.exports = function(sequelize, datatypes) {
	var lesson = sequelize.define("lesson",{
	name : datatypes.STRING,
	description : datatypes.STRING,
	number : datatypes.INTEGER,
	thumbpic : datatypes.STRING,
	lessonvid : datatypes.STRING,
	moduleId : datatypes.INTEGER
}, {
        classMethods: {
            associate: function(models) {
				//onDelete : "Cascade",
				//lesson.belongsTo(models.module);
            }
        }
    });
	
	return lesson;
}
