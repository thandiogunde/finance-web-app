// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env

// Create an Express application
const app = express();

// CORS Configuration
const allowedOrigins = [
  'https://finance-web-app-xi.vercel.app',
  'http://localhost:5173'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS error: Origin ${origin} not allowed`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));


// Middleware for CORS and preflight requests
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable preflight across all routes

// Middleware to parse incoming JSON data
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Define a test route
// Define a test route with a random message
app.get('/', (req, res) => {
    const messages = [
      "Financial Literacy API is live!",
      "You're connected to the backend!",
      "API up and running – success!",
      "Hello from the server!",
      "Server is healthy and happy 😊",
      "🚀 Backend deployed and operational!"
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    res.send(randomMessage);
  });
  

// Import and use routes
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

const budgetRoutes = require('./routes/budget');
app.use('/api/budget', budgetRoutes);

const savingsRoutes = require('./routes/savings');
app.use('/api/savings', savingsRoutes);

const contactRoutes = require('./routes/contact');
app.use('/api/contact', contactRoutes);

// Set the port number and start the server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));