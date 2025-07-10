const express = require('express');
const router = express.Router();
const cartItemModel = require('../models/cartItemModels');
const orderItemModel = require('../models/orderItemModels');
const verifyToken = require('../middlewares/authMiddlewares');
const authorizeRole = require('../middlewares/roleMiddlewares');

// to add products
router.post('/add', verifyToken, authorizeRole("userCompany"), async (req, res) => {
  const { userId, companyId, productId, qty } = req.body;

  try {
    const existingItem = await cartItemModel.findOne({ userId, productId });
    if (existingItem) {
      existingItem.qty += qty;
      await existingItem.save();
      return res.status(200).json({ message: 'Quantity updated', item: existingItem });
    }

    const newItem = new cartItemModel({ userId, companyId, productId, qty });
    await newItem.save();
    res.status(201).json({ message: 'Item added to cart', item: newItem });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// to get a product for a user
router.get('/:userId',verifyToken, authorizeRole("userCompany"), async (req, res) => {
  try {
    const cartItems = await cartItemModel.find({ userId: req.params.userId });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
});

// TO delete a product by its id
router.delete('/:id', verifyToken, authorizeRole("userCompany"), async (req, res) => {
  try {
    await cartItemModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// Move cart items to orders
router.post('/move-from-cart/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const cartItems = await cartItemModel.find({ userId });

    if (!cartItems.length) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const orderItems = cartItems.map(item => ({
      userId: item.userId,
      companyId: item.companyId,
      productId: item.productId,
      qty: item.qty
    }));

    await orderItemModel.insertMany(orderItems);
    await cartItemModel.deleteMany({ userId });

    res.status(200).json({ message: 'Order placed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error placing order', error: err.message });
  }
});

module.exports = router;