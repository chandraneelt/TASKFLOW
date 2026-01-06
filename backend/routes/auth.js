const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');

const router = express.Router();

// JWT token generation - keeping it simple
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// User registration endpoint
router.post('/register', [
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        message: 'Database not available. Please set up MongoDB to register an account.',
        setup: 'See QUICK_MONGODB_SETUP.md for 5-minute setup instructions',
        status: 'MongoDB connection required'
      });
    }

    const { name, email, password } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create and save new user
    const user = new User({ name, email, password });
    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle specific MongoDB errors
    if (error.name === 'MongooseError' && error.message.includes('buffering timed out')) {
      return res.status(503).json({ 
        message: 'Database connection timeout. Please set up MongoDB.',
        setup: 'See QUICK_MONGODB_SETUP.md for setup instructions'
      });
    }
    
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// User login endpoint
router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        message: 'Database not available. Please set up MongoDB to login.',
        setup: 'See QUICK_MONGODB_SETUP.md for 5-minute setup instructions',
        status: 'MongoDB connection required'
      });
    }

    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      user
    });
  } catch (error) {
    console.error('Login error:', error);
    
    // Handle specific MongoDB errors
    if (error.name === 'MongooseError' && error.message.includes('buffering timed out')) {
      return res.status(503).json({ 
        message: 'Database connection timeout. Please set up MongoDB.',
        setup: 'See QUICK_MONGODB_SETUP.md for setup instructions'
      });
    }
    
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;