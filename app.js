var express = require('express');
var app     = express();
var session = require('express-session');
var csrf    = require('express-csrf');

// Set up current session token
app.dynamichelpers({
    csrf: csrf.token
});

// Middlewares
app.use(express.session())
    .use(csrf.check());
    
// Routes
app.get ('/', function(req, res) {
        res.render('home.jade', {session: req.session});
    })
    .post('/', function(req, res){
        
    });

// 404 error
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});

app.listen(8080);
