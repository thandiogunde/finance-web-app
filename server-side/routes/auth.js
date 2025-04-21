const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   POST /api/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  // Password strength check
  const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  if (!strongPasswordPattern.test(password)) {
    return res.status(400).json({
      message: "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
    });
  }

  try {
    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Save new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: newUser 
    });
  } catch (error) {
    console.error("Registration error details:", error.message, error.stack);
    res.status(500).json({ 
      message: "Server error", 
      details: error.message  // Include error details in response
    });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if user exists
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "No account found. Please create an account." });
    }

    // 2. Check password (in real apps, hash + compare — we'll do plain for now)
    if (existingUser.password !== password) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    // 3. Success — return user
    res.status(200).json({
      message: "Login successful",
      user: existingUser
    });    
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;