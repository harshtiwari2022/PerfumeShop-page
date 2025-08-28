// routes/reviews.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Product = require('../models/Product');

// GET /api/reviews/:productId - get reviews for a product
router.get('/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).select('-__v');
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/reviews - create a review
// body: { product: productId, username, rating, comment }
router.post('/', async (req, res) => {
  try {
    const { product, username, rating, comment } = req.body;
    if (!product || !username || !rating) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newReview = await Review.create({ product, username, rating, comment });
    // push to product reviews array
    await Product.findByIdAndUpdate(product, { $push: { reviews: newReview._id } });
    res.status(201).json(newReview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
