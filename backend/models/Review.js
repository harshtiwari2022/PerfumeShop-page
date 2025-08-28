// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  username: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: String
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
