var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaceSchema = Schema({
  yelp_id: String,
  // TODO: When you createa place model, is there a way you can enter an array of times open or some other data structure that would be checked to determine if it is open or not? I.E. Boolean might not be powerful enough. What if you had an array of availability? Instead of hitting the yelp API every time you check to see if a place is open. 
  is_open_now: Boolean,
  // TODO: If you are using a join table user_place then you don't need this in your model; just reference your user_place table with a place_id to get all of the visitors
  visitors: [{
    type: Schema.Types.ObjectId,
    ref: 'UserPlace'
  }],
  currentPost: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
});

var Place = mongoose.model('Place', PlaceSchema);
module.exports = Place;
