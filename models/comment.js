var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = Schema({
  content: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
