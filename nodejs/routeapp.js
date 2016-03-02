var express = require('express');
var app = express();
var fs = require('fs');
var models = require('./models');
var body_parser = require('body-parser');
app.use(body_parser.json());
app.get('/', function(request, response) {
    response.send("Oh look, it's me");
});
app.get('/realtho', function(request, response) {
      fs.readFile('test.html',function (err, data){
        response.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        response.write(data);
        response.end();
    });
});
// ?lessonId=:id to get all with a specific lesson id
app.get('/question', (req, res) => {
	var where_clause = {};
	if (req.query.lessonId){
		where_clause.lessonId = req.query.lessonId;
	}
	models.question.findAll({where : where_clause}).then( (questions) => {
		res.status(200).json({ "questions" : questions});
	});
});

app.post('/lesson', (req, res) => {
	models.lesson.create({
		number : req.body.number,
		name : req.body.name,
		description : req.body.description,
		lessonId : req.body.lessonId
	}).then( (created) => {
		res.status(200).json({
			lessons: created.dataValues
		});
	});
});
app.post('/module', (req, res) => {
	models.module.create({
		name : req.body.name,
		description : req.body.description
	}).then( (created) => {
		res.status(200).json({
			modules: created.dataValues
		});
	});
});
app.post('/question', (req, res) => {
	models.question.create({
		question_text : req.body.question_text,
		answer : req.body.answer,
		a : req.body.a,
		b : req.body.b,
		c : req.body.c,
		d : req.body.d
	}).then( (created) => {
		res.status(200).json({
			questions: created.dataValues
		});
	});
});



module.exports = app;
//app.listen(3000);