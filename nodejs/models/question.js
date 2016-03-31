"use strict";

module.exports = function(sequelize, datatypes) {
	var question = sequelize.define("question",{
	question_text : datatypes.STRING,
	answer : datatypes.INTEGER,
	a : datatypes.STRING,
	b : datatypes.STRING,
	c : datatypes.STRING,
	d : datatypes.STRING,
	lessonId : datatypes.INTEGER
}, {
        classMethods: {
            associate: function(models) {
				question.belongsTo(models.lesson);
            }
        }
    });
	
	return question;
}
