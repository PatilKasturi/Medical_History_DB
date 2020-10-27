/**
* Module dependencies.
*/
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
//var methodOverride = require('method-override');
var app = express();
var mysql      = require('mysql');
var bodyParser=require("body-parser");
var connection = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',
              password : 'your_new_password',
              database : 'medical_history'
            });

connection.connect();

global.db = connection;

var session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 12000000 }
}))



// all environments
app.get('/', routes.index);//call for main index page
app.get('/login', routes.index);//call for login page
app.get('/signup',user.signup);
app.get('/dis',user.dis);
app.get('/acc',user.acc);
app.get('/family',user.family);
app.get('/update_profile',user.update1);
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.post('/pro_update',user.pro_update);
app.post('/update_profile',user.update1);
app.post('/dis1',user.remove);
app.post('/dis',user.add);
app.post('/acc1',user.remove1);
app.post('/acc',user.add1);
app.post('/family',user.add2);
app.post('/family1',user.remove2);
app.post('/login', user.login);//call for login post
app.post('/signup',user.signup);
app.get('/profile', user.profile);//call for dashboard page after login
app.get('/logout',user.logout);
//Middleware
app.listen(8080)
