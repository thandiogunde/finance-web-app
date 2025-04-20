const express = require('express');
const router = express.Router();
const Savings = require('../models/Savings');

router.post('/save', async (req, res) => {
  try {
    const { userId, goalAmount, savedAmount, monthsToSave } = req.body;
    const newSaving = new Savings({ userId, goalAmount, savedAmount, monthsToSave });
    await newSaving.save();
    res.status(201).json({ message: "Savings entry saved successfully" });
  } catch (error) {
    console.error("Saving error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const entries = await Savings.find({ userId: req.params.userId });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;