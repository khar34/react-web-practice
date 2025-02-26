import express from 'express';
import Product from '../models/product.model.js';
import mongoose from 'mongoose';

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ sucess: true, data: products });
  } catch (error) {
    console.log('Error in fetching products:', error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


router.post('/', async (req, res) => {
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

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Product Id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(505).json({ success: false, message: "Server Error" });
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  //console.log("id:", id);

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted successfully" });


  } catch (error) {
    console.log('Error in deleting product:', error);
    res.status(404).json({ success: false, message: "Product not found" });
  }
});

export default router;
