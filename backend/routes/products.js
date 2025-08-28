// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products - list all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().select('-__v').lean();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/products/:id - get product by id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate({
      path: 'reviews',
      select: '-__v -product'
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
