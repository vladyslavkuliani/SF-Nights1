var express = require('express');
var app = express();
var db = require('./models');
var bodyParser = require('body-parser');
var session = require('express-session');
// TODO: You can assign User = db.User instead of calling the ./models filesystem again
var User = require('./models/user.js');
const yelp = require('yelp-fusion');

var currentUserLocation = {
  "lat": null,
  "lng": null
}
var client;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
// TODO: Create white space between calls
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'VladsIngredientSuperSecretCookie',
  cookie: { maxAge: 30 * 60 * 1000 } // 30 minute cookie lifespan (in milliseconds)
}));
// TODO: Create white space between calls
// TODO: Check out hte Cors npm package. it will do this for you in one line.
app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

var thisUser;
// TODO your callback is asynchronous - You should consider moving the return statement into the callback anonymous function. You can't always predict the execution of this function as it currently is.
function currentUser(req){
  db.User.findOne({_id:req.session.userId}, function(err, user){
    thisUser = user;
  });
  return thisUser
}

//  Server.js:
//      This file is MUCH too large to be considered for production.
//      You need to extract the routing functions to an external controller folder.
//      Your routes are generally NOT RESTful. You are arbitrarily calling them whatever
//      is helpful to you.  You need to adhere to RESTful conventions.
//      Explore Express.router as an interesting alternative. This will reduce your
//      filesize considerably.
//


app.get('/', function(req, res){
  if(currentUser(req)){
    res.redirect('/profile');
  }
  else{
    currentUser["lat"] = null;
    currentUser["lng"] = null;
    res.sendFile(__dirname + '/views/login_signup.html');
  }
});

app.post('/signup', function(req, res){
  // TODO: customize your createSecure method to take an object of (name, email, dob, password) intead of requiring 4 separate arguments - makes your function call much cleaner.
    User.createSecure(req.body.name, req.body.email, req.body.dob, req.body.password, function(err, user){
      if(err){console.log(err);}
      res.json(user);
    });
});

app.post('/login', function(req, res){
  // TODO: customize your createSecure method to take an object of (email, password) intead of requiring 2 separate arguments - makes your function call much cleaner.
  User.authenticate(req.body.email, req.body.password, function(err, user){
    req.session.userId = user._id
    // TODO: What happens when the user is NOT authenticated?
    res.json(user);
  });
});

app.get('/logout', function(req, res){
  req.session.userId = null;
  res.redirect('/');
});

app.get("/profile", function(req, res){
  // TODO: This is a small endpoint. Fun challenge: Turn this into a ternary operator. And move it around so it displays (true condition check) ? true : false; False checks are weird.
  if(!currentUser(req)){
    res.redirect('/');
  }
  else{
    res.sendFile(__dirname + '/views/profile.html');
  }
});

app.get("/getUser", function(req, res){
  db.User.findOne({_id: req.session.userId}, function(err, user){
    // TODO: What happens if there is an err?
    res.json(user);
  });
});

// TODO: Is there no need for a return?  Is this a route handler or a helper function?
app.get('/setcurrentlocation', function(req, res){
  currentUserLocation["lat"] = req.query.lat;
  currentUserLocation["lng"] = req.query.lng;
});

// TODO: Should this be the actual return of the above function?
app.get('/position', function(req, res){
  res.json({lat:currentUserLocation["lat"], lng:currentUserLocation["lng"]});
});

app.get("/places", function(req,res){
  // TODO: I feel that this !currentUser(req) check could be extracted to a helper function.
  if(!currentUser(req)){
    res.redirect('/');
  }
  else{
    res.sendFile(__dirname + '/views/places.html');
  }
});

app.get("/getyelpdata", function(req,res){
  // TODO: I'm assuming these don't need to be hidden?
  yelp.accessToken("zlyKmaUcKVM3dc3lQQjfjQ", "xq4eOIaI6Lqupx1X0WYi5JD0ZuHm4VQLlpxxBMGT93btB7AQ86csvScdMD2yLC2d")
    // TODO: Method chaining looks better this way.
    .then(response => {
      client = yelp.client(response.jsonBody.access_token);

      client.search({
        term:'Night clubs',
        latitude: currentUserLocation["lat"],
        longitude: currentUserLocation["lng"],
        radius: 7000,
        limit:9
      }).then(response => {
        res.json(response);
      });
    })
    .catch(e => {
      console.log(e);
    });
});

app.post('/findorcreate', function(req,res){

  // TODO: Yay for helper functions!  I'd recommend extracting these to an external file OR putting them at the bottom of this file to make it easier to read and not clutter your route.
  function returningNewPlace(place, newPost){
    res.json({place: place, post: newPost});
  }

  function returnExistingPlace(place){
    db.Post.findOne({_id: place.currentPost}, function(err, post){
      res.json({place: place, post: post});
    });
  }

  db.Place.findOne({yelp_id: req.body.id}, function(err, foundPlace){
      client.business(req.body.id).then(function(detailedInfoPlace){
        console.log("DETAILED INFO");
        console.log(detailedInfoPlace.jsonBody["hours"]);
          if(!foundPlace){
            // TODO: Why are you not calling db.Place.create instead?
            var newPlace = new db.Place({
              yelp_id: req.body.id,
              currentPost: null,
              visitors: [],
              posts:[]
            });

            // TODO: lines 163 to 168 should be placed into a helper function. This breaks up the reading flow of your code.
            if(typeof detailedInfoPlace.jsonBody["hours"] !== "undefined"){
              newPlace.is_open_now = detailedInfoPlace.jsonBody["hours"][0].is_open_now;
            }
            else{
              newPlace.is_open_now = false;
            }

            newPlace.save();
            // TODO: This could be placed inside the original db.Place.create callback.
            var newPost = new db.Post({
                date: new Date(),
                rating: 0,
                placeId: newPlace._id,
                comments: []
            });
            newPost.save();

            newPlace.currentPost = newPost._id;
            newPlace.save();

            // TODO: This is all a lot of code for a relatively simple task. Use callbacks, use db.Place.create();
            returningNewPlace(newPlace, newPost);
        } else {
          foundPlace.is_open_now = detailedInfoPlace.jsonBody["hours"][0].is_open_now;
          // TODO: your returnExistingPlace function MIGHT execute before your .save() function is over. CALLBACKS!
          foundPlace.save();
          returnExistingPlace(foundPlace);
        }

      }).catch(e => {
        console.log(e);
        res.json();
      });
  });
});

app.get('/getpost', function(req, res){
  db.Place.findOne({yelp_id: req.query.clubId}, function(err, place){
    // TODO: What happens if there is an error?
    db.Post.findOne({_id: place.currentPost}, function(err, post){
      // TODO: What happens if there is an error?
      res.json(post);
    });
  });
});

app.get('/places/:id', function(req, res){
  res.sendFile(__dirname + '/views/clubPage.html');
});

app.get('/getplace', function(req, res){
    client.business(req.query.id).then(function(place){
      res.json(place);
    });
});

app.post('/leavecomment', function(req, res){
  // TODO: All of these calls would really benefit if you had them all in callback structure.  Everything in here is asynchronous so we can't predict what's going to happen 100% of the time.

  // TODO: Move this newComment creation into your db.Post.findOne before your foundPost.comments.push. Avoid .save()
  var newComment = new db.Comment({
    content: req.body.comment,
    userId: req.session.userId,
    rating: req.body.rating
  });
  newComment.save();

  db.Place.findOne({yelp_id: req.body.id}, function(err, foundPlace){
    db.Post.findOne({_id: foundPlace.currentPost}, function(err, foundPost){
      foundPost.comments.push(newComment._id);
      foundPost.votes.push(req.body.rating);
      foundPost.rating = (foundPost.votes.reduce((a,b)=>{return a+b}, 0)/foundPost.votes.length).toFixed(1);
      foundPost.save();
      newComment.postId = foundPost._id;
      newComment.save();
    });

    var newUserPlace = new db.UserPlace({
      date: new Date(),
      placeId: foundPlace._id,
      visitorId: req.session.userId
    });
    newUserPlace.save();
    foundPlace.visitors.push(newUserPlace._id);
    foundPlace.save();

    db.User.findOne({_id: req.session.userId}, function(err, user){
      user.visitedPlaces.push(newUserPlace._id);
      user.comments.push(newComment._id);
      user.save();
      newComment.userName = user.name;
      newComment.userProfilePic = user.profilePicture;
      newComment.save();
    });
  });

  res.json(newComment);
});

app.get("/comment", function(req, res){
    db.Comment.findOne({_id: req.query.id}, function(err, comment){
      // TODO: What happens if there is an error?
      res.json(comment);
    });
});

app.get('/user', function(req, res){
  db.User.findOne({_id: req.query.id}, function(err, user){
    // TODO: What happens if there is an error?
    res.json(user);
  });
})

//TODO delete if don't need it!!!
app.get('/allposts', function(req,res){
  db.Post.find({}, function(err, posts){
    res.json(posts);
  });
});

var server = app.listen(process.env.PORT || 3000)
