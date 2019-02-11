const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  content: String,
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  picPath: String,
  picName: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Post', postSchema);
