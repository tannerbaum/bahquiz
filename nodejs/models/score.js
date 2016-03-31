"use strict";

module.exports = function(sequelize, datatypes) {
	var score = sequelize.define("score",{
	user_name : datatypes.STRING,
	lesson_id : datatypes.INTEGER,
	module_id : datatypes.INTEGER,
	score : datatypes.INTEGER
}, {
        classMethods: {
            associate: function(models) {
				score.belongsTo(models.user);
            }
        }
    });
	
	return score;
}
