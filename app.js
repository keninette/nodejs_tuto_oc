var express             = require('express');           // load express framework
var app                 = express();                    // start express        
var logger              = require('morgan');            // http logger
var session             = require('express-session');   // session manager    
var bodyParser          = require('body-parser');                // parameters manager
var urlencodedparser    = bodyParser.urlencoded({ extended: false });

// Middlewares

// start logger
app.use(logger('combined')) 
    .use(session({
        secret : 'plop'
    }))
// if todolist isn't set, create an empty one    
    .use(function(req,res,next){
        if (typeof req.session.todolist === 'undefined') {
            console.log('empty todolist');
            req.session.todolist = [];
            req.session.todolist.push('plop');
            req.session.todolist.push('plup');
            req.session.todolist.push('plip');
            req.session.todolist.push('plap');
            req.session.todolist.push('plep');
        }
        next();
    });

// Routes
app .get ('/', function(req, res) {
        res.render('home.jade', {session: req.session});
    })
    .get('/todo', function(req,res) {       
        res.render('todo_view.jade', {todolist : req.session.todolist});
    })
    .get('/todo/delete/:index', function(req,res){
        
        // check if index is valid
        if ( ! isNaN(req.params.index)
        && req.params.index < req.session.todolist.length) {
            req.session.todolist.splice(req.params.index,1);
        }
        res.redirect('/todo');
    })
    .post('/todo/add', urlencodedparser, function(req,res) {
        req.session.todolist.push(req.body.task);        
        res.redirect('/todo');        
    });

// 404 error
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});

app.listen(8080);
