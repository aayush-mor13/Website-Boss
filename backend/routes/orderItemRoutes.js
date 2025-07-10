const express = require('express');
const router = express.Router();
const orderItemModel = require('../models/orderItemModels');
const verifyToken = require('../middlewares/authMiddlewares');
const authorizeRole = require('../middlewares/roleMiddlewares');

// Add an order item
router.post('/add', verifyToken, authorizeRole("userCompany"),async (req, res) => {
  try {
    const { userId, companyId, productId, qty } = req.body;

    const newItem = new orderItemModel({ userId, companyId, productId, qty });
    const savedItem = await newItem.save();

    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add order item', details: err.message });
  }
});

// Get all order items for a user
router.get('/:userId',verifyToken, authorizeRole("userCompany"), async (req, res) => {
  try {
    const userId = req.params.userId;
    const items = await orderItemModel.find({ userId }).sort({ addedAt: -1 });

    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order items', details: err.message });
  }
});

module.exports = router;