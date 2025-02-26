import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';
dotenv.config();

const app = express();

app.post('/products', async (req, res) => {
  const product = req.body; //user will send the product data in the request body
  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });

  } catch (error) {
    console.log('Error in creating product:', error);
  }
});


app.listen(3000, () => {
  connectDB();
  console.log('Server is running http://localhost:3000');

});
