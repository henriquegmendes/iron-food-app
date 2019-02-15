const mongoose = require('mongoose');

const { Schema } = mongoose;


const commentSchema = new Schema({
  title: String,
  content: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  imagePath: String,
  imageName: String,
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Comment', commentSchema);
