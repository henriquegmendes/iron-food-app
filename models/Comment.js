const mongoose = require('mongoose');


const Schema = mongoose.Schema;



const commentSchema = new Schema({
  title: String,
  content: String,
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  imagePath: String,
  imageName: String,
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Comment', commentSchema);
