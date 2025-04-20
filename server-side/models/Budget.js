const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  userId: String, // you can change to mongoose.Schema.Types.ObjectId if referencing the User model
  income: Number,
  expenses: [
    {
      category: String,
      amount: Number
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Budget', budgetSchema);
