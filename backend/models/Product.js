// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortDescription: String,
  fullDescription: String,
  price: { type: Number, required: true },
  availableSizes: [String],
  images: [String],
  // store review references
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
