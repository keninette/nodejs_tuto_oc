var express = require('express');
var session = require('cookie-session'); 
var bodyParser = require('body-parser'); // Parameters handler
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app     = express();

// Middlewares
app.use(session({secret: 'plop'}));

// If todolist doesn't exist, create an empty one
app.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
});

// Routes
app.get ('/', function(req, res) {
        res.render('home.jade', {session: req.session});
    })
    .get('/todo', function(req,res) {
        res.render('todo.jade', {todolist : req.session.todolist});
    })
    .post('/todo/add', function(req, res) {
        
    })
    .get('/todo/delete/:id', function(req,res) {
        
    });

// 404 error
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});

app.listen(8080);
