var express = require("express");

var app = express();

var hbs = require("hbs");

var bodyParser = require("body-parser");



app.set("view engine", "html");

app.engine("html", hbs.__express);

app.use(bodyParser.urlencoded());



app.get("/", function(req,res){

    res.render("index",{name:"Eric Schles",greeting:"Hello there"});

});



app.listen(5000);



console.log("Server started on http://localhost:5000")