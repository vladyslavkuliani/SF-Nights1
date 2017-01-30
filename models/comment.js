var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = Schema({
  content: String,
  // TODO: would this be duplicate information?
  userName: String,
  userProfilePic: String,

  rating: Number,
  // TODO: See my recommendations about user and post comments
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }
});

var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
