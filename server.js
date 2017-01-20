var express = require('express');
var app = express();
var db = require('./models');
var bodyParser = require('body-parser');
var session = require('express-session');
var User = require('./models/user.js');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'VladsIngredientSuperSecretCookie',
  cookie: { maxAge: 30 * 60 * 1000 } // 30 minute cookie lifespan (in milliseconds)
}));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/login_signup.html');
});

app.post('/signup', function(req, res){
  User.createSecure(req.body.name, req.body.email, req.body.dob, req.body.password, function(err, user){
    if(err){console.log(err);}
    res.json(user);
  });
});

app.post('/login', function(req, res){
  User.authenticate(req.body.email, req.body.password, function(err, user){
    console.log(user);
    req.session.userId = user._id
    res.json(user);
  });
});

app.get("/profile", function(req, res){
  res.sendFile(__dirname + '/views/profile.html');
});

app.get("/getUser", function(req, res){
  db.User.findOne({_id: req.session.userId}, function(err, user){
    res.json(user);
  });
});

app.get("/places", function(req,res){
  res.sendFile(__dirname + '/views/places.html');
});

var server = app.listen(process.env.PORT || 3000)
