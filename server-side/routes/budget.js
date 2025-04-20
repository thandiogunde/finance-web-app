const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');

// POST: Save a new budget
router.post('/save', async (req, res) => {
  try {
    const { userId, income, expenses } = req.body;
    const newBudget = new Budget({ userId, income, expenses });
    await newBudget.save();
    res.status(201).json({ message: "Budget saved successfully" });
  } catch (error) {
    console.error("Budget save error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET: Retrieve all budgets for a user
router.get('/:userId', async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.params.userId });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;