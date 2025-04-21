const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Registration attempt for:", email);

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!strongPasswordPattern.test(password)) {
    return res.status(400).json({
      message: "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
    });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      console.log("User already exists:", email);
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password before saving - we'll remove the pre-save hook in the User model
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds = 10

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    console.log("User registered successfully:", email);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error("Registration error details:", error.message, error.stack);
    res.status(500).json({ 
      message: "Server error", 
      details: error.message
    });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt for:", email);

  try {
    // 1. Check if user exists
    const existingUser = await User.findOne({ email });
    console.log("User found:", existingUser ? "Yes" : "No");

    if (!existingUser) {
      return res.status(404).json({ message: "No account found. Please create an account." });
    }

    // 2. Compare password (hash + compare)
    const isMatch = await bcrypt.compare(password, existingUser.password);
    console.log("Password match:", isMatch ? "Yes" : "No");

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    // 3. Success — return user without password
    const userResponse = {
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email
    };

    res.status(200).json({
      message: "Login successful",
      user: userResponse
    });    
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;