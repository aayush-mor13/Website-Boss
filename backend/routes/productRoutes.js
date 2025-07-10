const express = require('express');
const router = express.Router();
const productModel = require('../models/productModels');
const verifyToken = require('../middlewares/authMiddlewares');
const authorizeRole = require('../middlewares/roleMiddlewares');

// Create a new product
router.post('/', verifyToken, authorizeRole("admin", "adminCompany"), async (req, res) => {
  try {
    const { name, companyId, description, price, sku, image } = req.body;

    const newProduct = new productModel({
      name,
      companyId,
      description,
      price,
      sku,
      image
    });

    await newProduct.save();

    return res.status(201).json({
      message: 'Product created successfully',
      product: newProduct
    });
  } catch (err) {
    console.error(`Error in posting the product details : ${err}`);
    if (err.code === 11000) {
      const duplicatedField = Object.keys(err.keyValue)[0];
      return res.status(400).json({
        message: `Duplicate entry for "${duplicatedField}" — value must be unique.`
      });
    }
  }
});

// Get all products for a specific company
router.get('/company/:companyId', async (req, res) => {
  try {
    const { companyId } = req.params;
    const products = await productModel.find({ companyId });
    return res.status(200).json(products);
  } catch (err) {
    console.error(`Error fetching products: ${err}`);
    return res.status(500).json({ message: 'Failed to fetch products.' });
  }
});

//get product for a id
router.get('/:id', async (req, res) => {
  const productId = req.params.id;
  const product = await productModel.findById(productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.status(200).json(product);
});

// Delete product
router.delete('/:productId', verifyToken, authorizeRole("admin", "adminCompany"), async (req, res) => {
  try {
    const { productId } = req.params;
    await productModel.findByIdAndDelete(productId);
    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(`Error deleting product: ${err}`);
    return res.status(500).json({ message: 'Failed to delete product.' });
  }
});

// Update product price
router.patch('/:productId/price', verifyToken, authorizeRole("admin", "adminCompany"), async (req, res) => {
  try {
    const { price } = req.body;
    const { productId } = req.params;

    if (!price) return res.status(400).json({ message: 'New price is required.' });

    const updated = await productModel.findByIdAndUpdate(productId, { price }, { new: true });

    return res.status(200).json({ message: 'Price updated', product: updated });
  } catch (err) {
    console.error(`Error updating price: ${err}`);
    return res.status(500).json({ message: 'Failed to update price.' });
  }
});

module.exports = router;
