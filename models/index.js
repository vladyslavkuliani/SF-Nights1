var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/sf-nights');

module.exports.User = require("./user.js");
module.exports.Place = require('./place.js');
module.exports.UserPlace = require('./user_place.js');
module.exports.Post = require('./post.js');
module.exports.Comment = require('./comment.js');
