import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const giftProducts = [
  {
    name: 'Custom Corporate Gift Box',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop',
    description: 'A premium gift box tailored for corporate clients, including branded mugs, pens, and a notebook.',
    brand: 'Spike Business Solutions',
    category: 'Corporate Solutions',
    price: 49.99,
    countInStock: 100,
  },
  {
    name: 'Branded Coffee Mug',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop',
    description: 'High-quality ceramic coffee mug customized with your company logo.',
    brand: 'Spike Printing',
    category: 'Branding',
    price: 9.99,
    countInStock: 500,
  },
  {
    name: 'Personalized Executive Pen',
    image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=800&auto=format&fit=crop',
    description: 'A sleek, metal pen with custom laser engraving.',
    brand: 'Spike Custom Gifts',
    category: 'Custom Gifts',
    price: 14.99,
    countInStock: 200,
  },
  {
    name: 'Custom Printed T-Shirt',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop',
    description: 'Comfortable cotton t-shirt featuring high-quality custom screen printing.',
    brand: 'Spike Printing',
    category: 'Printing',
    price: 19.99,
    countInStock: 300,
  }
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.create([
      { name: 'Admin User', email: 'admin@spike.com', password: 'password123', isAdmin: true }
    ]);

    const adminUserId = createdUsers[0]._id;

    const sampleProducts = giftProducts.map((product) => {
      return { ...product, user: adminUserId };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
