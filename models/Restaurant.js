const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restSchema = new Schema(
  {
    name: String,
    type: { type: String, enum: ['coffee shop', 'fast food', 'bar'] },
    description: String,
    address: { type: String },
    imgPath: String,
    imgName: String,
    comments: { type: Array, default: null },
    location: { type: { type: String }, coordinates: [Number] }
  },
  {
    timestamps: true
  }
);

restSchema.index({ location: '2dsphere' });

const Restaurant = mongoose.model('Restaurant', restSchema);

module.exports = Restaurant;
