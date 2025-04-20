const mongoose = require('mongoose');

const savingsSchema = new mongoose.Schema({
  userId: String,
  goalAmount: Number,
  savedAmount: Number,
  monthsToSave: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Savings', savingsSchema);
