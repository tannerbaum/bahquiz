var express = require('express');
var app = express();
var fs = require('fs');
var cors = require('cors');
var models = require('./models');
var body_parser = require('body-parser');
app.use(body_parser.json());

app.use(cors());
app.get('/products/:id', function(req, res, next){
 res.json({msg: 'This is CORS-enabled for all origins!'});
});
app.listen(80, function(){
 console.log('CORS-enabled web server listening on port 80');
});

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

app.get('/module', (req,res) => {
	var where_clause = {};
	if (req.query.moduleId){
		where_clause.lessonId = req.query.moduleId;
	}
	models.module.findAll({where : where_clause}).then( (modules) => {
		res.status(200).json({ "modules" : modules});
	});
});

app.get('/lesson', (req,res) => {
	var where_clause = {};
	if (req.query.lessonId){
		where_clause.moduleId = req.query.moduleId;
	}
	models.lesson.findAll({where : where_clause}).then( (lessons) => {
		res.status(200).json({ "lessons" : lessons});
	});
});

app.get('/user', (req,res) => {
	var where_clause = {};
	if (req.query.userId){
		where_clause.userId = req.query.userId;
	}
	models.user.findAll({where : where_clause}).then( (users) => {
		res.status(200).json({ "users" : users});
	});
});

app.get('/score', (req,res) => {
	var where_clause = {};
	if (req.query.scoreId){
		where_clause.scoreId = req.query.scoreId;
	}
	models.score.findAll({where : where_clause}).then( (scores) => {
		res.status(200).json({ "scores" : scores});
	});
});

app.post('/lesson', (req, res) => {
	models.lesson.create({
		number : req.body.number,
		name : req.body.name, 
		description : req.body.description,
		thumbpic : req.body.thumbpic,
		lessonvid : req.body.lessonvid,
		moduleId : req.body.moduleId
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

app.post('/user', (req, res) => {
	models.user.create({
		name : req.body.name,
		pass : req.body.pass
	}).then( (created) => {
		res.status(200).json({
			users: created.dataValues
		});
	});
});

app.post('/scores', (req, res) => {
	models.score.create({
		user_name : req.body.user_name,
		module_id : req.body.module_id,
		lesson_id : req.body.lesson_id,
		score : req.body.score
	}).then( (created) => {
		res.status(200).json({
			scores: created.dataValues
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
		d : req.body.d,
		lessonId : req.body.lessonId
	}).then( (created) => {
		res.status(200).json({
			questions: created.dataValues
		});
	});
});



module.exports = app;
//app.listen(3000);