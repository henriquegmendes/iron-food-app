const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restSchema = new Schema(
  {
    name: String,
    type: { type: String },
    description: String,
    address: { type: String },
    // price: Number,
    minPrice: Number,
    maxPrice: Number,
    imgPath: String,
    imgName: String,
    location: { type: { type: String }, coordinates: [Number] }
  },
  {
    timestamps: true
  }
);

restSchema.index({ location: '2dsphere' });

const Restaurant = mongoose.model('Restaurant', restSchema);

module.exports = Restaurant;
