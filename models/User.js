const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = Schema({
  name: String,
  email: String,
  password: String,
  imgPath: { type: String, default: '' },
  imgName: String,
  comments: Array,
  role: {
    type: String,
    enum: ['User', 'Admin'],
    default: 'User'
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
