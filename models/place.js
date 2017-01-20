var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaceSchema = Schema({
  name: String,
  city: String,
  lat: Number,
  lng: Number,
  zipCode: Number,
  visitors: [{
    type: Schema.Types.ObjectId,
    ref: 'UserPlace'
  }],
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
});

var Place = mongoose.model('Place', PlaceSchema);
module.exports = Place;
