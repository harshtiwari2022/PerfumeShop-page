// seed.js - populate DB with luxury perfumes and reviews
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('./models/Product');
const Review = require('./models/Review');

// Luxury products array
const products = [
  {
    name: 'Eau de Parfum',
    shortDescription: 'A timeless fragrance.',
    fullDescription: 'Eau de Parfum is a classic scent with notes of jasmine, sandalwood, and subtle musk. Perfect for every occasion.',
    price: 75.0,
    sizes: ['50ml', '100ml', '150ml'],
    images: [
      'https://images.pexels.com/photos/3059609/pexels-photo-3059609.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/373989/pexels-photo-373989.jpeg?auto=compress&cs=tinysrgb&w=600'
    ]
  },
     {
    name: 'Floral Essence',
    shortDescription: 'Bloom with every spritz.',
    fullDescription: 'Floral Essence offers a bouquet of fresh flowers, perfect for springtime.',
    price: 65.00,
    availableSizes: ['50ml', '100ml'],
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHDLwTHJR_mv_loZ482Yo39sXh5dIuO9081Q&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp6VaCas1-pXKH3GqwK7mJUsmLQbahck_Jpb0dWKW0DXGSrdS2m4LdVHTegwClb6EsXyo&usqp=CAU'
    ]
  },
  {
    name: 'Mystic Oud',
    shortDescription: 'Deep and alluring.',
    fullDescription: 'Mystic Oud combines rich oud notes with hints of amber for a captivating aroma.',
    price: 120.00,
    availableSizes: ['50ml', '100ml'],
    images: [
      'https://perfumeuae.com/wp-content/uploads/2024/07/Habit-Rouge-Le-Parfum-1.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ-FcmkqjP75eniqAyKNRspTC4xvjYnuHXhPL7DH7rHEpSn40vxvIlKB4VfYlCtilCTG0&usqp=CAU'
    ]
  },
  {
    name: 'Citrus Splash',
    shortDescription: 'Fresh and invigorating.',
    fullDescription: 'Citrus Splash brings a burst of lemon and bergamot, perfect for daily wear.',
    price: 55.00,
    availableSizes: ['50ml', '100ml'],
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5oYyX7tybZSo8pm0tIRsnuFXGG5CQLcihlmgZLjQv1mCtu8ZnzDzXjXCQNqsYxPmWgIw&usqp=CAU',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG5plWi0mvOBsHmY8-LFTTb35qIRWgdRuW1BgEVnyn0SOxExfhK-uMmxjccLVapISjXiw&usqp=CAU'
    ]
  },
  {
    name: 'Amber Nights',
    shortDescription: 'Warm and sensual.',
    fullDescription: 'Amber Nights blends warm amber with vanilla and musk, ideal for evening occasions.',
    price: 85.00,
    availableSizes: ['50ml', '100ml'],
    images: [
      'https://dev.guerlain.com/dw/image/v2/BDCZ_DEV/on/demandware.static/-/Sites-GSA_master_catalog/default/dw7c566db3/Secondary_visuals_2/2021/A&M/AM_SECONDARY-VISUAL_PRODUCT-PAGE_SANTAL-PAO-ROSA.jpg?sw=655&sh=655&sfrm=jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb0f6RfvcCKsXEoWigRIKHFVXaP9TXOXQ5HFCH4rBMulg9n_daFEpOkrJsKdN8w5rIK5Y&usqp=CAU'
    ]
  }  

];

// Luxury-style reviews
const reviews = [
  { username: 'JaneDoe', rating: 5, comment: 'Absolutely love this fragrance! Lasts all day.' },
  { username: 'JohnSmith', rating: 4, comment: 'Great scent, luxurious and classy.' },
  { username: 'PerfumeLover', rating: 5, comment: 'A perfect blend of floral and woody notes.' },
  { username: 'ScentFanatic', rating: 3, comment: 'Good fragrance, a bit strong for my taste.' },
  { username: 'LuxuryAddict', rating: 5, comment: 'Feels like a premium boutique perfume. Highly recommend!' },
  { username: 'EleganceSeeker', rating: 4, comment: 'Elegant and sophisticated, perfect for special occasions.' }
];

// Seed function
const seed = async () => {
  try {
    if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI not set in .env');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await Review.deleteMany({});
    console.log('🗑️ Cleared existing data');

    for (const p of products) {
      const prod = await Product.create(p);
      console.log(`➕ Added product: ${prod.name}`);

      // add 1-3 random reviews to each product
      const count = Math.floor(Math.random() * 3) + 1;
      const shuffled = [...reviews].sort(() => 0.5 - Math.random());
      const chosen = shuffled.slice(0, count);

      for (const r of chosen) {
        const created = await Review.create({ product: prod._id, ...r });
        await Product.findByIdAndUpdate(prod._id, { $push: { reviews: created._id } });
        console.log(`   ➕ Added review by ${created.username}`);
      }
    }

    console.log('🎉 Seeding complete');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
};

seed();
