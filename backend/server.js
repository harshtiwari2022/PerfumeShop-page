// server.js - Express server
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const productsRoute = require('./routes/products');
const reviewsRoute = require('./routes/reviews');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRoute);
app.use('/api/reviews', reviewsRoute);

app.get('/', (req, res) => res.send('Perfume Shop API'));

const start = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message || err);
    process.exit(1);
  }
};

start();
